import type { ReactNode } from "react";

export function LoadingState({ label = "Loading statecraft data" }: { label?: string }) {
  return (
    <main className="page-shell">
      <div className="status-panel">{label}</div>
    </main>
  );
}

export function ErrorState({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <main className="page-shell">
      <div className="status-panel status-panel--error">
        <strong>{message}</strong>
        {action}
      </div>
    </main>
  );
}
