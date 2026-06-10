import type { NationStats } from "@statecraft/shared";
import { formatEnum } from "../format";

const statKeys: Array<keyof Omit<NationStats, "id" | "nationId">> = [
  "economy",
  "stability",
  "liberty",
  "authority",
  "military",
  "technology",
  "environment",
  "publicTrust"
];

export function StatGrid({ stats }: { stats: NationStats | null }) {
  if (!stats) {
    return <p className="muted">No stats recorded.</p>;
  }

  return (
    <div className="stat-grid">
      {statKeys.map((key) => (
        <div className="stat-row" key={key}>
          <span>{formatEnum(key)}</span>
          <strong>{stats[key]}</strong>
          <div className="stat-bar" aria-hidden="true">
            <div style={{ width: `${stats[key]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
