import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MapLocation } from "@statecraft/shared";
import { NationNav } from "../App";
import { getMapLocations, getNation } from "../api";
import { ErrorState, LoadingState } from "../components/AsyncState";
import { MapGrid } from "../components/MapGrid";
import { formatEnum } from "../format";

export function MapPage() {
  const { id } = useParams();
  const nationId = id ?? "";
  const [nationName, setNationName] = useState("Nation");
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([getNation(nationId), getMapLocations(nationId)])
      .then(([nation, loadedLocations]) => {
        setNationName(nation.name);
        setLocations(loadedLocations);
        setSelectedLocation(loadedLocations[0] ?? null);
        setLoaded(true);
      })
      .catch((caught: Error) => setError(caught.message));
  }, [nationId]);

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!loaded) {
    return <LoadingState />;
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Strategic Map</p>
          <h1>{nationName}</h1>
        </div>
        <NationNav nationId={nationId} />
      </header>

      <section className="map-layout">
        <MapGrid locations={locations} selectedLocationId={selectedLocation?.id} onSelect={setSelectedLocation} />
        <aside className="panel location-panel">
          <div className="panel-kicker">Selected Location</div>
          <h2>{selectedLocation?.name ?? "Unselected"}</h2>
          {selectedLocation ? (
            <dl className="detail-list">
              <div>
                <dt>Type</dt>
                <dd>{formatEnum(selectedLocation.type)}</dd>
              </div>
              <div>
                <dt>Coordinates</dt>
                <dd>
                  {selectedLocation.x}, {selectedLocation.y}
                </dd>
              </div>
              <div>
                <dt>Resource</dt>
                <dd>{formatEnum(selectedLocation.resourceType)}</dd>
              </div>
              <div>
                <dt>Population</dt>
                <dd>{selectedLocation.population?.toLocaleString() ?? "None"}</dd>
              </div>
              <div>
                <dt>Development</dt>
                <dd>Level {selectedLocation.developmentLevel}</dd>
              </div>
            </dl>
          ) : null}
        </aside>
      </section>
    </main>
  );
}
