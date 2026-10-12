import { useMemo } from "react";
import { View } from "react-native";
import {
  Camera,
  GeoJSONSource,
  Layer,
  Map,
} from "@maplibre/maplibre-react-native";
import type { FeatureCollection, Point } from "geojson";

import type { LngLat, TripSpot } from "@/constants/trip-itineraries";

const LIME = "#8DE175";
const OLIVE = "#536600";

/** Light street basemap suitable for city-scale trip views. */
const MAP_STYLE = "https://demotiles.maplibre.org/style.json";

interface TripDayMapProps {
  center: LngLat;
  spots: TripSpot[];
}

function spotsToGeoJSON(spots: TripSpot[]): FeatureCollection<Point> {
  return {
    type: "FeatureCollection",
    features: spots.map((spot) => ({
      type: "Feature",
      properties: { id: spot.id, name: spot.name },
      geometry: {
        type: "Point",
        coordinates: spot.coordinates,
      },
    })),
  };
}

/** Returns [west, south, east, north] padded around spot coordinates. */
function boundsFromSpots(
  spots: TripSpot[]
): [number, number, number, number] | null {
  if (spots.length === 0) {
    return null;
  }

  let minLng = spots[0].coordinates[0];
  let maxLng = spots[0].coordinates[0];
  let minLat = spots[0].coordinates[1];
  let maxLat = spots[0].coordinates[1];

  for (const spot of spots) {
    const [lng, lat] = spot.coordinates;
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }

  const padLng = Math.max((maxLng - minLng) * 0.35, 0.01);
  const padLat = Math.max((maxLat - minLat) * 0.35, 0.01);

  return [
    minLng - padLng,
    minLat - padLat,
    maxLng + padLng,
    maxLat + padLat,
  ];
}

/**
 * Full-bleed MapLibre map for a trip day — city center + lime/olive spot pins.
 */
export function TripDayMap({ center, spots }: TripDayMapProps) {
  const geojson = useMemo(() => spotsToGeoJSON(spots), [spots]);
  const bounds = useMemo(() => boundsFromSpots(spots), [spots]);

  return (
    <View className="absolute inset-0">
      <Map
        mapStyle={MAP_STYLE}
        style={{ flex: 1 }}
        attribution={false}
        logo={false}
        compass={false}
      >
        {bounds ? (
          <Camera
            key={`${spots.map((s) => s.id).join("-")}-bounds`}
            initialViewState={{
              bounds,
              padding: {
                top: 80,
                bottom: 160,
                left: 40,
                right: 40,
              },
            }}
            minZoom={10}
            maxZoom={16}
          />
        ) : (
          <Camera
            key={`${center[0]}-${center[1]}-center`}
            initialViewState={{
              center,
              zoom: 12,
            }}
            minZoom={10}
            maxZoom={16}
          />
        )}
        <GeoJSONSource id="trip-day-spots" data={geojson}>
          <Layer
            id="trip-day-spots-halo"
            type="circle"
            paint={{
              "circle-radius": 14,
              "circle-color": LIME,
              "circle-opacity": 0.35,
            }}
          />
          <Layer
            id="trip-day-spots-fill"
            type="circle"
            paint={{
              "circle-radius": 8,
              "circle-color": OLIVE,
              "circle-stroke-width": 2,
              "circle-stroke-color": LIME,
            }}
          />
        </GeoJSONSource>
      </Map>
    </View>
  );
}
