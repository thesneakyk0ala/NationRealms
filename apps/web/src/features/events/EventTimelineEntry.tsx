import type { EventHistoryEntry } from "@statecraft/shared";

export function EventTimelineEntry({ entry }: { entry: EventHistoryEntry }) {
  return (
    <article className="panel panel--compact">
      <h3>{entry.title}</h3>
      <p>{entry.resultSummary}</p>
    </article>
  );
}
