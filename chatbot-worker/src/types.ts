export interface Env {
  CHAT_SESSIONS: KVNamespace;
  GEMINI_API_KEY: string;
  CALCOM_API_KEY: string;
  ALLOWED_ORIGINS: string;
  CALCOM_EVENT_TYPE_ID: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  ts: number;
}

export interface SessionData {
  messages: ChatMessage[];
  metadata: {
    created: number;
    lastActive: number;
    booked: boolean;
    attendeeEmail: string | null;
    messageCount10m: number;
    windowStart: number;
  };
}

export interface ChatRequest {
  sessionId: string;
  message: string;
}

export interface SSEEvent {
  type: "chunk" | "slots" | "booked" | "done" | "error";
  text?: string;
  slots?: string[];
  title?: string;
  start?: string;
  timezone?: string;
  message?: string;
  fallbackUrl?: string;
}

// Gemini API types
export interface GeminiContent {
  role: "user" | "model";
  parts: GeminiPart[];
}

export interface GeminiPart {
  text?: string;
  functionCall?: {
    name: string;
    args: Record<string, unknown>;
  };
  functionResponse?: {
    name: string;
    response: Record<string, unknown>;
  };
  [key: string]: unknown; // Preserve thought_signature and other fields
}

export interface GeminiResponse {
  candidates: Array<{
    content: GeminiContent;
    finishReason: string;
  }>;
}

export interface CalcomSlot {
  start: string;
  end: string;
}

export interface CalcomSlotsResponse {
  status: string;
  data: Record<string, CalcomSlot[]>;
}

export interface CalcomBookingResponse {
  status: string;
  data: {
    id: number;
    uid: string;
    title: string;
    start: string;
    end: string;
    status: string;
  };
}
