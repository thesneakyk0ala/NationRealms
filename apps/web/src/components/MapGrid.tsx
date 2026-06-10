import type { MapLocation } from "@statecraft/shared";
import { formatEnum, locationMarker } from "../format";

export function MapGrid({
  locations,
  selectedLocationId,
  onSelect
}: {
  locations: MapLocation[];
  selectedLocationId?: string;
  onSelect: (location: MapLocation) => void;
}) {
  const width = 10;
  const height = 10;
  const cells = Array.from({ length: width * height }, (_, index) => {
    const x = index % width;
    const y = Math.floor(index / width);
    const location = locations.find((item) => item.x === x && item.y === y);

    return (
      <button
        className={`map-cell ${location ? "map-cell--location" : ""} ${
          location?.id === selectedLocationId ? "map-cell--selected" : ""
        }`}
        key={`${x}-${y}`}
        type="button"
        onClick={() => location && onSelect(location)}
        aria-label={location ? `${location.name}, ${formatEnum(location.type)}` : `Empty tile ${x}, ${y}`}
      >
        {location ? (
          <>
            <span className="map-marker">{locationMarker(location.type)}</span>
            <span className="map-label">{location.name}</span>
          </>
        ) : null}
      </button>
    );
  });

  return <div className="map-grid">{cells}</div>;
}
