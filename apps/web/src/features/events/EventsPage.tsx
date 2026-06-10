import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ActiveEvent, EventHistoryEntry, EventResolutionResult } from "@statecraft/shared";
import { NationNav } from "../../App";
import { advanceTurn, chooseEvent, generateEvent, getEventHistory, getEvents, getNation } from "../../api";
import { ErrorState, LoadingState } from "../../components/AsyncState";
import { ActiveEventCard } from "./ActiveEventCard";
import { EventHistoryList } from "./EventHistoryList";

export function EventsPage() {
  const { id } = useParams();
  const nationId = id ?? "";
  const [nationName, setNationName] = useState("Nation");
  const [currentTurn, setCurrentTurn] = useState<number | null>(null);
  const [events, setEvents] = useState<ActiveEvent[]>([]);
  const [history, setHistory] = useState<EventHistoryEntry[]>([]);
  const [latestResult, setLatestResult] = useState<EventResolutionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  async function refresh() {
    const [nation, loadedEvents, loadedHistory] = await Promise.all([
      getNation(nationId),
      getEvents(nationId),
      getEventHistory(nationId)
    ]);
    setNationName(nation.name);
    setCurrentTurn(nation.currentTurn ?? null);
    setEvents(loadedEvents);
    setHistory(loadedHistory);
    setLoaded(true);
  }

  useEffect(() => {
    refresh().catch((caught: Error) => setError(caught.message));
  }, [nationId]);

  async function resolveChoice(activeEventId: string, choiceId: string) {
    setBusy(activeEventId);
    setError(null);

    try {
      const result = await chooseEvent(activeEventId, choiceId);
      setLatestResult(result);
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not resolve event");
    } finally {
      setBusy(null);
    }
  }

  async function handleGenerate() {
    setBusy("generate");
    setError(null);

    try {
      await generateEvent(nationId);
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not generate event");
    } finally {
      setBusy(null);
    }
  }

  async function handleAdvanceTurn() {
    setBusy("advance");
    setError(null);

    try {
      const result = await advanceTurn(nationId);
      setCurrentTurn(result.currentTurn);
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not advance turn");
    } finally {
      setBusy(null);
    }
  }

  if (error && !loaded) {
    return <ErrorState message={error} />;
  }

  if (!loaded) {
    return <LoadingState />;
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Cabinet Events</p>
          <h1>{nationName}</h1>
          <p>Turn {currentTurn ?? "?"}</p>
        </div>
        <NationNav nationId={nationId} />
      </header>

      <section className="event-controls panel">
        <div>
          <div className="panel-kicker">Issue Engine</div>
          <h2>National Agenda</h2>
          <p>Generate a new eligible issue or advance the nation turn to let the political calendar move.</p>
        </div>
        <div className="event-control-actions">
          <button className="secondary-action" type="button" onClick={handleGenerate} disabled={Boolean(busy)}>
            Generate Event
          </button>
          <button className="primary-action" type="button" onClick={handleAdvanceTurn} disabled={Boolean(busy)}>
            Advance Turn
          </button>
        </div>
      </section>

      {error ? <p className="form-error">{error}</p> : null}
      {latestResult ? <p className="result-summary">{latestResult.resultSummary}</p> : null}

      <section className="two-column">
        <div>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Active</p>
              <h2>Current Issues</h2>
            </div>
          </div>
          <div className="stack">
            {events.length === 0 ? <p className="muted">No active events. Generate one to test the engine.</p> : null}
            {events.map((event) => (
              <ActiveEventCard
                event={event}
                key={event.id}
                resolving={busy === event.id}
                onChoose={(choiceId) => resolveChoice(event.id, choiceId)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Timeline</p>
              <h2>Resolved Events</h2>
            </div>
          </div>
          <EventHistoryList history={history} />
        </div>
      </section>
    </main>
  );
}
