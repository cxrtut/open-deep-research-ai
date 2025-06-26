import { streamStorage } from "@/deepresearch/storage";
import { StreamEvent } from "@/deepresearch/schemas";
import { getResearch } from "@/db/action";

// Types for streaming data

interface ResearchStatusRow {
  type: "research_status";
  status: "pending" | "completed" | "processing" | "questions";
  timestamp: number;
  iteration: number;
}

export type ResearchEventStreamEvents = ResearchStatusRow | StreamEvent;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return new Response("Missing chatId", { status: 400 });
  }

  try {
    // Get research data from database and events from Redis
    const research = await getResearch(chatId);
    const events = await streamStorage.getEvents(chatId);

    const steps: ResearchEventStreamEvents[] = [
      {
        type: "research_status",
        status: research?.status || "pending",
        timestamp:
          research?.researchStartedAt?.getTime() || new Date().getTime(),
        iteration: -1,
      },
      ...events,
    ];

    return new Response(JSON.stringify(steps), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error fetching research data:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
