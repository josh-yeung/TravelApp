import type { ImageSourcePropType } from "react-native";

export type LngLat = [number, number];

export interface TripSpot {
  id: string;
  name: string;
  category: string;
  image: ImageSourcePropType;
  coordinates: LngLat;
  transitLabel: string;
}

export interface TripDayItinerary {
  date: string;
  distanceLabel: string;
  spotsCount: number;
  spots: TripSpot[];
}

export interface TripGeo {
  center: LngLat;
  days: Record<string, TripDayItinerary>;
}

const IMG_LOUVRE = require("../assets/images/trip-day/louvre.jpeg");
const IMG_TUILERIES = require("../assets/images/trip-day/tuileries.jpeg");

/** Fallback spot imagery reused across mock destinations. */
const FALLBACK_A = IMG_LOUVRE;
const FALLBACK_B = IMG_TUILERIES;

function dayItinerary(
  date: string,
  distanceLabel: string,
  spots: TripSpot[]
): TripDayItinerary {
  return {
    date,
    distanceLabel,
    spotsCount: spots.length,
    spots,
  };
}

const PARIS_APR_5_SPOTS: TripSpot[] = [
  {
    id: "louvre",
    name: "Louvre\nMuseum",
    category: "Attraction",
    image: IMG_LOUVRE,
    coordinates: [2.3376, 48.8606],
    transitLabel: "5min • 748m",
  },
  {
    id: "tuileries",
    name: "Tuileries\nGarden",
    category: "Attraction",
    image: IMG_TUILERIES,
    coordinates: [2.327, 48.8634],
    transitLabel: "2min • 1.2km",
  },
];

function parisGenericDay(
  date: string,
  a: { name: string; coords: LngLat; transit: string },
  b: { name: string; coords: LngLat; transit: string }
): TripDayItinerary {
  return dayItinerary(date, "3km", [
    {
      id: `${date}-a`,
      name: a.name,
      category: "Attraction",
      image: FALLBACK_A,
      coordinates: a.coords,
      transitLabel: a.transit,
    },
    {
      id: `${date}-b`,
      name: b.name,
      category: "Attraction",
      image: FALLBACK_B,
      coordinates: b.coords,
      transitLabel: b.transit,
    },
  ]);
}

const PARIS: TripGeo = {
  center: [2.3522, 48.8566],
  days: {
    "2026-04-05": dayItinerary("2026-04-05", "3km", PARIS_APR_5_SPOTS),
    "2026-04-06": parisGenericDay(
      "2026-04-06",
      {
        name: "Musée\nd'Orsay",
        coords: [2.3265, 48.8599],
        transit: "8min • 1.1km",
      },
      {
        name: "Seine\nWalk",
        coords: [2.3364, 48.8584],
        transit: "4min • 600m",
      }
    ),
    "2026-04-07": parisGenericDay(
      "2026-04-07",
      {
        name: "Notre-\nDame",
        coords: [2.3499, 48.8529],
        transit: "6min • 900m",
      },
      {
        name: "Latin\nQuarter",
        coords: [2.3431, 48.8499],
        transit: "3min • 450m",
      }
    ),
    "2026-04-08": parisGenericDay(
      "2026-04-08",
      {
        name: "Eiffel\nTower",
        coords: [2.2945, 48.8584],
        transit: "10min • 1.4km",
      },
      {
        name: "Trocadéro",
        coords: [2.2872, 48.862],
        transit: "5min • 700m",
      }
    ),
    "2026-04-09": parisGenericDay(
      "2026-04-09",
      {
        name: "Montmartre",
        coords: [2.3431, 48.8867],
        transit: "7min • 800m",
      },
      {
        name: "Sacré-\nCœur",
        coords: [2.343, 48.8867],
        transit: "2min • 200m",
      }
    ),
    "2026-04-10": parisGenericDay(
      "2026-04-10",
      {
        name: "Marais\nDistrict",
        coords: [2.361, 48.857],
        transit: "5min • 650m",
      },
      {
        name: "Place des\nVosges",
        coords: [2.3655, 48.8556],
        transit: "3min • 400m",
      }
    ),
    "2026-04-11": parisGenericDay(
      "2026-04-11",
      {
        name: "Canal\nSaint-Martin",
        coords: [2.366, 48.871],
        transit: "9min • 1.2km",
      },
      {
        name: "Père\nLachaise",
        coords: [2.3933, 48.8614],
        transit: "12min • 1.8km",
      }
    ),
    "2026-04-12": parisGenericDay(
      "2026-04-12",
      {
        name: "Luxembourg\nGardens",
        coords: [2.3372, 48.8462],
        transit: "6min • 850m",
      },
      {
        name: "Panthéon",
        coords: [2.346, 48.8462],
        transit: "4min • 500m",
      }
    ),
  },
};

const ROME: TripGeo = {
  center: [12.4964, 41.9028],
  days: {
    "2026-05-10": parisGenericDay(
      "2026-05-10",
      {
        name: "Colosseum",
        coords: [12.4922, 41.8902],
        transit: "8min • 1.0km",
      },
      {
        name: "Roman\nForum",
        coords: [12.4853, 41.8925],
        transit: "4min • 500m",
      }
    ),
    "2026-05-11": parisGenericDay(
      "2026-05-11",
      {
        name: "Vatican\nMuseums",
        coords: [12.4534, 41.9065],
        transit: "12min • 1.5km",
      },
      {
        name: "St. Peter's\nBasilica",
        coords: [12.4539, 41.9022],
        transit: "5min • 600m",
      }
    ),
    "2026-05-12": parisGenericDay(
      "2026-05-12",
      {
        name: "Trevi\nFountain",
        coords: [12.4833, 41.9009],
        transit: "6min • 700m",
      },
      {
        name: "Spanish\nSteps",
        coords: [12.4823, 41.9059],
        transit: "4min • 450m",
      }
    ),
    "2026-05-13": parisGenericDay(
      "2026-05-13",
      {
        name: "Pantheon",
        coords: [12.4768, 41.8986],
        transit: "5min • 550m",
      },
      {
        name: "Piazza\nNavona",
        coords: [12.4731, 41.8992],
        transit: "3min • 350m",
      }
    ),
    "2026-05-14": parisGenericDay(
      "2026-05-14",
      {
        name: "Trastevere",
        coords: [12.4675, 41.889],
        transit: "9min • 1.1km",
      },
      {
        name: "Gianicolo",
        coords: [12.4614, 41.8915],
        transit: "7min • 800m",
      }
    ),
    "2026-05-15": parisGenericDay(
      "2026-05-15",
      {
        name: "Villa\nBorghese",
        coords: [12.485, 41.914],
        transit: "10min • 1.3km",
      },
      {
        name: "Piazza del\nPopolo",
        coords: [12.4768, 41.9107],
        transit: "5min • 600m",
      }
    ),
  },
};

const TOKYO: TripGeo = {
  center: [139.6917, 35.6895],
  days: {
    "2026-06-02": parisGenericDay(
      "2026-06-02",
      {
        name: "Senso-ji",
        coords: [139.7967, 35.7148],
        transit: "8min • 900m",
      },
      {
        name: "Nakamise\nStreet",
        coords: [139.796, 35.7125],
        transit: "3min • 300m",
      }
    ),
    "2026-06-03": parisGenericDay(
      "2026-06-03",
      {
        name: "Meiji\nShrine",
        coords: [139.6993, 35.6764],
        transit: "10min • 1.2km",
      },
      {
        name: "Harajuku",
        coords: [139.7025, 35.6702],
        transit: "5min • 650m",
      }
    ),
    "2026-06-04": parisGenericDay(
      "2026-06-04",
      {
        name: "Shibuya\nCrossing",
        coords: [139.7006, 35.6595],
        transit: "6min • 700m",
      },
      {
        name: "Yoyogi\nPark",
        coords: [139.695, 35.671],
        transit: "8min • 1.0km",
      }
    ),
    "2026-06-05": parisGenericDay(
      "2026-06-05",
      {
        name: "Tokyo\nSkytree",
        coords: [139.8107, 35.7101],
        transit: "12min • 1.6km",
      },
      {
        name: "Sumida\nRiver",
        coords: [139.805, 35.71],
        transit: "4min • 500m",
      }
    ),
    "2026-06-06": parisGenericDay(
      "2026-06-06",
      {
        name: "Ginza",
        coords: [139.7671, 35.6717],
        transit: "7min • 850m",
      },
      {
        name: "Imperial\nPalace",
        coords: [139.7528, 35.6852],
        transit: "9min • 1.1km",
      }
    ),
    "2026-06-07": parisGenericDay(
      "2026-06-07",
      {
        name: "Akihabara",
        coords: [139.7714, 35.6984],
        transit: "6min • 750m",
      },
      {
        name: "Ueno\nPark",
        coords: [139.773, 35.715],
        transit: "8min • 1.0km",
      }
    ),
    "2026-06-08": parisGenericDay(
      "2026-06-08",
      {
        name: "TeamLab\nPlanets",
        coords: [139.793, 35.65],
        transit: "15min • 2.0km",
      },
      {
        name: "Odaiba",
        coords: [139.775, 35.625],
        transit: "10min • 1.4km",
      }
    ),
  },
};

const TRIP_GEO: Record<string, TripGeo> = {
  paris: PARIS,
  rome: ROME,
  tokyo: TOKYO,
};

export function getTripGeo(tripId: string): TripGeo | undefined {
  return TRIP_GEO[tripId];
}

export function getDayItinerary(
  tripId: string,
  date: string
): TripDayItinerary | undefined {
  return TRIP_GEO[tripId]?.days[date];
}
