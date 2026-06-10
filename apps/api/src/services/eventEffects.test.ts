import { describe, expect, it } from "vitest";
import { buildStatPatch, clampStat, type StatSnapshot } from "./eventEffects.js";

const stats: StatSnapshot = {
  economy: 50,
  stability: 50,
  liberty: 50,
  authority: 50,
  military: 50,
  technology: 50,
  environment: 50,
  publicTrust: 50
};

describe("event stat effects", () => {
  it("clamps stat values between 0 and 100", () => {
    expect(clampStat(-12)).toBe(0);
    expect(clampStat(112)).toBe(100);
    expect(clampStat(42.6)).toBe(43);
  });

  it("builds a partial stat patch from valid effects only", () => {
    expect(
      buildStatPatch(stats, {
        economy: 5,
        stability: -8,
        publicTrust: 99
      })
    ).toEqual({
      economy: 55,
      stability: 42,
      publicTrust: 100
    });
  });
});
