import type { EventChoiceDefinition, StatModifier } from "@statecraft/shared";
import { formatEnum } from "../../format";

function statEntries(changes?: StatModifier) {
  return Object.entries(changes ?? {}).filter(([, value]) => typeof value === "number" && value !== 0);
}

export function EventEffectsPreview({ choice }: { choice: EventChoiceDefinition }) {
  const entries = statEntries(choice.effects.statChanges);

  if (entries.length === 0) {
    return <small>Secondary effects only</small>;
  }

  return (
    <small className="effects-preview">
      {entries.map(([key, value]) => (
        <span className={value! > 0 ? "effect-positive" : "effect-negative"} key={key}>
          {formatEnum(key)} {value! > 0 ? "+" : ""}
          {value}
        </span>
      ))}
    </small>
  );
}
