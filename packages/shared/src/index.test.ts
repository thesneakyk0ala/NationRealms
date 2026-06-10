import { describe, expect, it } from "vitest";
import type { EventChoice, NationStatKey } from "./index";

const statKeys: NationStatKey[] = [
  "economy",
  "stability",
  "liberty",
  "authority",
  "military",
  "technology",
  "environment",
  "publicTrust"
];

describe("shared domain types", () => {
  it("keeps event effects constrained to known nation stat keys", () => {
    const choice: EventChoice = {
      id: "invest",
      label: "Invest in public works",
      description: "Fund infrastructure and public services.",
      effects: {
        economy: 3,
        publicTrust: 4
      }
    };

    expect(Object.keys(choice.effects ?? {}).every((key) => statKeys.includes(key as NationStatKey))).toBe(true);
  });
});
