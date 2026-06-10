import type { NationStatKey } from "@statecraft/shared";

export type StatEffects = Partial<Record<NationStatKey, number>>;
export type StatSnapshot = Record<NationStatKey, number>;

export const nationStatKeys: NationStatKey[] = [
  "economy",
  "stability",
  "liberty",
  "authority",
  "military",
  "technology",
  "environment",
  "publicTrust"
];

export function clampStat(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function buildStatPatch(stats: StatSnapshot, effects: StatEffects = {}) {
  const patch: Partial<StatSnapshot> = {};

  for (const key of nationStatKeys) {
    const effect = effects[key];
    if (typeof effect === "number" && Number.isFinite(effect)) {
      patch[key] = clampStat(stats[key] + effect);
    }
  }

  return patch;
}
