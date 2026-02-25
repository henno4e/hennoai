import type { Env, GeminiContent, GeminiPart, GeminiResponse, SSEEvent } from "./types";
import { SYSTEM_PROMPT, TOOL_DECLARATIONS } from "./prompt";
import { getAvailableSlots, bookMeeting } from "./calcom";
import { getServiceInfo } from "./services";

const GEMINI_API_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview";
const MAX_TOOL_CALLS = 3;

export async function generateChatResponse(
  env: Env,
  history: GeminiContent[],
  userMessage: string,
  sendEvent: (event: SSEEvent) => void
): Promise<string> {
  const contents: GeminiContent[] = [
    ...history,
    { role: "user", parts: [{ text: `[VISITOR MESSAGE]: ${userMessage}` }] },
  ];

  let fullResponse = "";
  let toolCallCount = 0;

  while (toolCallCount <= MAX_TOOL_CALLS) {
    const geminiResponse = await callGemini(env.GEMINI_API_KEY, contents);

    const parts = geminiResponse.candidates[0]?.content?.parts || [];
    let hasFunctionCall = false;

    for (const part of parts) {
      if (part.text) {
        fullResponse += part.text;
        sendEvent({ type: "chunk", text: part.text });
      }

      if (part.functionCall) {
        hasFunctionCall = true;
        toolCallCount++;

        const toolResult = await executeTool(
          env,
          part.functionCall.name,
          part.functionCall.args,
          sendEvent
        );

        // Add model's function call and our result to the conversation
        contents.push({
          role: "model",
          parts: [{ functionCall: part.functionCall }],
        });
        contents.push({
          role: "user",
          parts: [
            {
              functionResponse: {
                name: part.functionCall.name,
                response: toolResult,
              },
            },
          ],
        });
      }
    }

    if (!hasFunctionCall) {
      break;
    }

    if (toolCallCount >= MAX_TOOL_CALLS) {
      break;
    }
  }

  sendEvent({ type: "done" });
  return fullResponse;
}

async function callGemini(
  apiKey: string,
  contents: GeminiContent[]
): Promise<GeminiResponse> {
  const res = await fetch(`${GEMINI_API_BASE}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      tools: [{ functionDeclarations: TOOL_DECLARATIONS }],
      generationConfig: {
        temperature: 1.0,
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errorBody}`);
  }

  return res.json();
}

async function executeTool(
  env: Env,
  name: string,
  args: Record<string, unknown>,
  sendEvent: (event: SSEEvent) => void
): Promise<Record<string, unknown>> {
  switch (name) {
    case "get_available_slots": {
      const result = await getAvailableSlots(
        env.CALCOM_API_KEY,
        env.CALCOM_EVENT_TYPE_ID,
        args.startDate as string | undefined,
        args.endDate as string | undefined,
        args.timezone as string | undefined
      );

      if ("slots" in result && result.slots.length > 0) {
        sendEvent({ type: "slots", slots: result.slots });
      }

      return result as Record<string, unknown>;
    }

    case "book_meeting": {
      const result = await bookMeeting(
        env.CALCOM_API_KEY,
        env.CALCOM_EVENT_TYPE_ID,
        args.startTime as string,
        args.attendeeName as string,
        args.attendeeEmail as string,
        args.attendeeTimezone as string | undefined
      );

      if ("title" in result) {
        sendEvent({
          type: "booked",
          title: result.title,
          start: result.start,
          timezone: (args.attendeeTimezone as string) || "Africa/Johannesburg",
        });
      }

      return result as Record<string, unknown>;
    }

    case "get_services_info": {
      return getServiceInfo(args.service as string) as Record<string, unknown>;
    }

    default:
      return { error: `Unknown tool: ${name}` };
  }
}
