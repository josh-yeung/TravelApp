import { View } from "react-native";
import {
  Camera,
  GeoJSONSource,
  Layer,
  Map,
} from "@maplibre/maplibre-react-native";
import type {
  ExpressionSpecification,
  StyleSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import type { Feature, FeatureCollection } from "geojson";

import countriesGeoJSON from "@/assets/geo/countries.json";
import { MOCK_VISITED_COUNTRIES } from "@/constants/profile";

const FOREST = "#44655A";
const UNVISITED = "#d5ddd8";

/** Natural Earth sometimes falls back to ADM0_A3 (3-letter) when ISO_A2 is missing. */
const ISO_ALIASES: Record<string, string> = {
  FRA: "FR",
  NOR: "NO",
};

/**
 * Minimal light style — demotiles already owns a `countries-fill` layer and paints
 * its own choropleth, which collided with / hid our visited shading.
 */
const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {},
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#F7FAFB",
      },
    },
  ],
};

function normalizeCountries(raw: FeatureCollection): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: raw.features.map((feature: Feature) => {
      const props = feature.properties ?? {};
      const rawIso = typeof props.iso === "string" ? props.iso : "";
      const iso = ISO_ALIASES[rawIso] ?? rawIso;

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

const countriesData = normalizeCountries(
  countriesGeoJSON as FeatureCollection,
);

function buildVisitedFillColor(): ExpressionSpecification {
  return [
    "case",
    [
      "in",
      ["get", "iso"],
      ["literal", [...MOCK_VISITED_COUNTRIES]],
    ],
    FOREST,
    UNVISITED,
  ];
}

interface ProfileWorldMapProps {
  height?: number;
}

/**
 * Interactive MapLibre world map with a countries fill layer.
 * Visited ISO codes use forest green; the same source can drive future shading UX.
 */
export function ProfileWorldMap({ height = 200 }: ProfileWorldMapProps) {
  return (
    <View
      className="w-full overflow-hidden rounded-2xl"
      style={{ height }}
    >
      <Map
        mapStyle={MAP_STYLE}
        style={{ flex: 1 }}
        attribution={false}
        logo={false}
        compass={false}
      >
        <Camera
          initialViewState={{
            center: [10, 20],
            zoom: 0.8,
          }}
          minZoom={0}
          maxZoom={6}
        />
        <GeoJSONSource id="visited-countries" data={countriesData}>
          <Layer
            id="visited-countries-fill"
            type="fill"
            paint={{
              "fill-color": buildVisitedFillColor(),
              "fill-opacity": 1,
            }}
          />
          <Layer
            id="visited-countries-outline"
            type="line"
            paint={{
              "line-color": "#c5c9ac",
              "line-width": 0.6,
              "line-opacity": 0.9,
            }}
          />
        </GeoJSONSource>
      </Map>
    </View>
  );
}
