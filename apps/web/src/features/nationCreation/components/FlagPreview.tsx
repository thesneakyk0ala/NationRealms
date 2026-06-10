import type { FlagIdentity } from "@statecraft/shared";

export function FlagPreview({ flag, name }: { flag: FlagIdentity; name?: string }) {
  return (
    <div className="flag-preview" style={{ background: flag.primaryColor }}>
      <div style={{ background: flag.secondaryColor }} />
      <strong style={{ color: flag.accentColor }}>{flag.emblemSymbol.slice(0, 1)}</strong>
      <span>{name || "New Nation"}</span>
    </div>
  );
}
