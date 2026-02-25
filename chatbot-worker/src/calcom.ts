import type { CalcomSlotsResponse, CalcomBookingResponse } from "./types";

const CALCOM_API_BASE = "https://api.cal.com/v2";

export async function getAvailableSlots(
  apiKey: string,
  eventTypeId: string,
  startDate?: string,
  endDate?: string,
  timezone?: string
): Promise<{ slots: string[] } | { error: string }> {
  const tz = timezone || "Africa/Johannesburg";
  const start = startDate || getNextBusinessDay();
  const end = endDate || addBusinessDays(start, 5);

  const params = new URLSearchParams({
    eventTypeId,
    start,
    end,
    timeZone: tz,
    format: "range",
  });

  const res = await fetch(`${CALCOM_API_BASE}/slots?${params}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": "2024-09-04",
    },
  });

  if (!res.ok) {
    return { error: `Cal.com slots API returned ${res.status}` };
  }

  const data: CalcomSlotsResponse = await res.json();
  const allSlots: string[] = [];

  for (const dateSlots of Object.values(data.data)) {
    for (const slot of dateSlots) {
      allSlots.push(slot.start);
    }
  }

  return { slots: allSlots };
}

export async function bookMeeting(
  apiKey: string,
  eventTypeId: string,
  startTime: string,
  attendeeName: string,
  attendeeEmail: string,
  attendeeTimezone?: string
): Promise<
  { title: string; start: string; uid: string } | { error: string }
> {
  const res = await fetch(`${CALCOM_API_BASE}/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": "2024-08-13",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start: startTime,
      eventTypeId: Number(eventTypeId),
      attendee: {
        name: attendeeName,
        email: attendeeEmail,
        timeZone: attendeeTimezone || "Africa/Johannesburg",
      },
      metadata: {
        source: "chatbot",
      },
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    return { error: `Cal.com booking failed (${res.status}): ${errorBody}` };
  }

  const data: CalcomBookingResponse = await res.json();
  return {
    title: data.data.title,
    start: data.data.start,
    uid: data.data.uid,
  };
}

function getNextBusinessDay(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }
  return date.toISOString().split("T")[0];
}

function addBusinessDays(startDate: string, days: number): string {
  const date = new Date(startDate);
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      added++;
    }
  }
  return date.toISOString().split("T")[0];
}
