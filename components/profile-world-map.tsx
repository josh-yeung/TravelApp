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
import type { FeatureCollection } from "geojson";

import countriesGeoJSON from "@/assets/geo/countries.json";
import { normalizeCountriesGeoJSON } from "@/lib/countries-catalog";
import { useVisitedCountries } from "@/lib/visited-countries";

const FOREST = "#44655A";
const UNVISITED = "#d5ddd8";

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

const countriesData = normalizeCountriesGeoJSON(
  countriesGeoJSON as FeatureCollection,
);

function buildVisitedFillColor(
  visitedCountries: string[],
): string | ExpressionSpecification {
  if (visitedCountries.length === 0) {
    return UNVISITED;
  }

  return [
    "case",
    ["in", ["get", "iso"], ["literal", visitedCountries]],
    FOREST,
    UNVISITED,
  ];
}

interface ProfileWorldMapProps {
  height?: number;
}

/**
 * Interactive MapLibre world map with a countries fill layer.
 * Visited ISO codes use forest green from the shared visited-countries store.
 */
export function ProfileWorldMap({ height = 200 }: ProfileWorldMapProps) {
  const visitedCountries = useVisitedCountries();

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
              "fill-color": buildVisitedFillColor(visitedCountries),
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
