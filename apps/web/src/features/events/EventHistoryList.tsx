import type { EventHistoryEntry } from "@statecraft/shared";
import { formatDate, formatEnum } from "../../format";

export function EventHistoryList({ history }: { history: EventHistoryEntry[] }) {
  if (history.length === 0) {
    return <p className="muted">No resolved events yet.</p>;
  }

  return (
    <div className="stack">
      {history.map((entry) => (
        <article className="panel panel--compact event-history-entry" key={entry.id}>
          <div className="panel-kicker">
            Turn {entry.turn} / {formatDate(entry.createdAt)}
          </div>
          <h3>{entry.title}</h3>
          <p>
            <strong>{entry.selectedChoiceLabel}</strong>
          </p>
          <p>{entry.resultSummary}</p>
          <div className="tag-list">
            {Object.entries(entry.effects.statChanges ?? {}).map(([key, value]) => (
              <span key={key}>
                {formatEnum(key)} {value! > 0 ? "+" : ""}
                {value}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
