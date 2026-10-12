import type { Feature, FeatureCollection } from "geojson";

import countriesGeoJSON from "@/assets/geo/countries.json";

/** Natural Earth sometimes falls back to ADM0_A3 (3-letter) when ISO_A2 is missing. */
export const ISO_ALIASES: Record<string, string> = {
  FRA: "FR",
  NOR: "NO",
};

export interface CountryCatalogItem {
  iso: string;
  name: string;
  flag: string;
}

export function normalizeIso(rawIso: string): string {
  return ISO_ALIASES[rawIso] ?? rawIso;
}

/** Regional-indicator flag emoji from ISO 3166-1 alpha-2 (e.g. CA → 🇨🇦). */
export function getCountryFlagEmoji(iso: string): string {
  if (iso.length !== 2) {
    return "🏳️";
  }

  const upper = iso.toUpperCase();
  const base = 0x1f1e6;
  const points = [0, 1].map((i) => {
    const code = upper.charCodeAt(i);
    return base + (code - 65);
  });

  return String.fromCodePoint(...points);
}

function readName(props: Record<string, unknown>): string {
  if (typeof props.name === "string" && props.name.length > 0) {
    return props.name;
  }
  return "Unknown";
}

function buildCatalog(): CountryCatalogItem[] {
  const raw = countriesGeoJSON as FeatureCollection;
  const byIso = new Map<string, CountryCatalogItem>();

  for (const feature of raw.features) {
    const props = (feature.properties ?? {}) as Record<string, unknown>;
    const rawIso = typeof props.iso === "string" ? props.iso : "";
    const iso = normalizeIso(rawIso);

    if (iso.length !== 2) {
      continue;
    }

    if (!byIso.has(iso)) {
      byIso.set(iso, {
        iso,
        name: readName(props),
        flag: getCountryFlagEmoji(iso),
      });
    }
  }

  return [...byIso.values()].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );
}

/** Sorted A–Z country list for the Add Countries screen. */
export const COUNTRIES_CATALOG: CountryCatalogItem[] = buildCatalog();

export const TOTAL_COUNTRIES_IN_CATALOG = COUNTRIES_CATALOG.length;

export function normalizeCountriesGeoJSON(
  raw: FeatureCollection,
): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: raw.features.map((feature: Feature) => {
      const props = feature.properties ?? {};
      const rawIso = typeof props.iso === "string" ? props.iso : "";
      const iso = normalizeIso(rawIso);

      return {
        ...feature,
        id: iso || feature.id,
        properties: {
          ...props,
          iso,
        },
      };
    }),
  };
}
