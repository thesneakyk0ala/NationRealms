import type { EventChoiceDefinition } from "@statecraft/shared";
import { EventEffectsPreview } from "./EventEffectsPreview";

export function EventChoiceButton({
  choice,
  disabled,
  onChoose
}: {
  choice: EventChoiceDefinition;
  disabled: boolean;
  onChoose: () => void;
}) {
  return (
    <button className="choice-button" disabled={disabled} type="button" onClick={onChoose}>
      <strong>{choice.label}</strong>
      <span>{choice.description}</span>
      <EventEffectsPreview choice={choice} />
    </button>
  );
}
