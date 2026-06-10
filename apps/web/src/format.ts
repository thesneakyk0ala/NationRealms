import type { LocationType, NationPostType } from "@statecraft/shared";

export function formatEnum(value?: string | null) {
  if (!value) {
    return "None";
  }

  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export function locationMarker(type: LocationType) {
  const markers: Record<LocationType, string> = {
    CAPITAL: "*",
    CITY: "C",
    TOWN: "T",
    PORT: "P",
    MILITARY_BASE: "B",
    MINE: "M",
    FARM: "F",
    RESOURCE_SITE: "R"
  };

  return markers[type];
}

export function postTypeLabel(type: NationPostType) {
  return formatEnum(type);
}
