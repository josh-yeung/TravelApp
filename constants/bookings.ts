import type { ImageSourcePropType } from "react-native";

export interface FlightBooking {
  id: string;
  tripId: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  duration: string;
  departLabel: string;
  arriveLabel: string;
}

export interface TripBookingsSummary {
  tripId: string;
  heroImage: ImageSourcePropType;
  staysCta: string;
  flights: FlightBooking[];
}

const PARIS_HERO = require("../assets/images/bookings/paris-hero.png");
const ROME_HERO = require("../assets/images/trips/rome.png");
const TOKYO_HERO = require("../assets/images/trips/tokyo.png");

const PARIS_FLIGHT: FlightBooking = {
  id: "paris-yyz-cdg",
  tripId: "paris",
  originCode: "YYZ",
  originCity: "Toronto",
  destinationCode: "CDG",
  destinationCity: "Paris",
  duration: "7h 51m",
  departLabel: "April 3, 7:42pm",
  arriveLabel: "April 4, 1:33am",
};

const TRIP_BOOKINGS: Record<string, TripBookingsSummary> = {
  paris: {
    tripId: "paris",
    heroImage: PARIS_HERO,
    staysCta: "Find a place to stay",
    flights: [PARIS_FLIGHT],
  },
  rome: {
    tripId: "rome",
    heroImage: ROME_HERO,
    staysCta: "Find a place to stay",
    flights: [
      {
        id: "rome-yyz-fco",
        tripId: "rome",
        originCode: "YYZ",
        originCity: "Toronto",
        destinationCode: "FCO",
        destinationCity: "Rome",
        duration: "9h 10m",
        departLabel: "May 10, 6:15pm",
        arriveLabel: "May 11, 8:25am",
      },
    ],
  },
  tokyo: {
    tripId: "tokyo",
    heroImage: TOKYO_HERO,
    staysCta: "Find a place to stay",
    flights: [
      {
        id: "tokyo-yyz-hnd",
        tripId: "tokyo",
        originCode: "YYZ",
        originCity: "Toronto",
        destinationCode: "HND",
        destinationCity: "Tokyo",
        duration: "13h 40m",
        departLabel: "Jun 2, 1:05pm",
        arriveLabel: "Jun 3, 4:45pm",
      },
    ],
  },
};

/** Flights shown on the global Bookings hub (Figma shows the Paris card). */
export function getHubFlights(): FlightBooking[] {
  return TRIP_BOOKINGS.paris?.flights ?? [];
}

export function getTripBookings(
  tripId: string
): TripBookingsSummary | undefined {
  return TRIP_BOOKINGS[tripId];
}
