import type { Env, ChatRequest, SessionData, SSEEvent, GeminiContent } from "./types";
import { generateChatResponse } from "./gemini";

const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days
const RATE_LIMIT_WINDOW = 60 * 10; // 10 minutes
const RATE_LIMIT_MAX = 20;
const MAX_HISTORY_TO_GEMINI = 20;
const MAX_MESSAGE_LENGTH = 1000;
const CALCOM_FALLBACK_URL = "https://cal.com/henno-4e/30min";

export async function handleChat(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>
): Promise<Response> {
  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const sessionId = body.sessionId || crypto.randomUUID();
  const message = stripHtml(body.message || "").slice(0, MAX_MESSAGE_LENGTH);

  if (!message.trim()) {
    return new Response(JSON.stringify({ error: "Empty message" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Load session
  let session = await loadSession(env, sessionId);

  // Rate limiting
  const now = Math.floor(Date.now() / 1000);
  if (now - session.metadata.windowStart > RATE_LIMIT_WINDOW) {
    session.metadata.windowStart = now;
    session.metadata.messageCount10m = 0;
  }
  session.metadata.messageCount10m++;

  if (session.metadata.messageCount10m > RATE_LIMIT_MAX) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please wait a moment." }),
      {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // SSE streaming response
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const sendEvent = (event: SSEEvent) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
  };

  // Process in background so we can return the stream immediately
  const processing = (async () => {
    try {
      // Build Gemini history from stored messages
      const geminiHistory: GeminiContent[] = session.messages
        .slice(-MAX_HISTORY_TO_GEMINI)
        .map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("model" as const),
          parts: [{ text: m.content }],
        }));

      const assistantResponse = await generateChatResponse(
        env,
        geminiHistory,
        message,
        sendEvent
      );

      // Save to session
      session.messages.push(
        { role: "user", content: message, ts: now },
        { role: "assistant", content: assistantResponse, ts: Math.floor(Date.now() / 1000) }
      );
      session.metadata.lastActive = Math.floor(Date.now() / 1000);

      await saveSession(env, sessionId, session);
    } catch (err) {
      console.error("Chat error:", err);
      sendEvent({
        type: "error",
        message: "I'm having trouble right now.",
        fallbackUrl: CALCOM_FALLBACK_URL,
      });
      sendEvent({ type: "done" });
    } finally {
      await writer.close();
    }
  })();

  // Use waitUntil to keep the worker alive while streaming
  // Note: In Cloudflare Workers, the runtime keeps the worker alive
  // as long as the response stream is open, but we ensure cleanup.

  return new Response(readable, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Session-Id": sessionId,
    },
  });
}

export async function handleHistory(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>
): Promise<Response> {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId) {
    return new Response(JSON.stringify({ messages: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const session = await loadSession(env, sessionId);
  const messages = session.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  return new Response(JSON.stringify({ messages }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function loadSession(env: Env, sessionId: string): Promise<SessionData> {
  try {
    const raw = await env.CHAT_SESSIONS.get(`session:${sessionId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Fall through to default
  }

  const now = Math.floor(Date.now() / 1000);
  return {
    messages: [],
    metadata: {
      created: now,
      lastActive: now,
      booked: false,
      attendeeEmail: null,
      messageCount10m: 0,
      windowStart: now,
    },
  };
}

async function saveSession(
  env: Env,
  sessionId: string,
  session: SessionData
): Promise<void> {
  try {
    await env.CHAT_SESSIONS.put(
      `session:${sessionId}`,
      JSON.stringify(session),
      { expirationTtl: SESSION_TTL }
    );
  } catch (err) {
    console.error("KV save error:", err);
  }
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}
