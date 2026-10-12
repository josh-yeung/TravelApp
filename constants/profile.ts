/** Mock profile + travel stats for MVP (no auth yet). */
export const MOCK_PROFILE = {
  name: "John Smith",
  age: 21,
  country: "Canada",
  countryFlag: "🇨🇦",
  tripsCount: 14,
  savedCount: 42,
  continentsLogged: 4,
  totalCountries: 195,
} as const;

/**
 * Seed ISO codes for the in-memory visited store (`lib/visited-countries.ts`).
 * Runtime counts / map shading read from that store after the user Saves.
 */
export const MOCK_VISITED_COUNTRIES = [
  "CA",
  "US",
  "MX",
  "FR",
  "IT",
  "ES",
  "PT",
  "GB",
  "DE",
  "NL",
  "JP",
  "KR",
  "TH",
  "AU",
  "NZ",
  "BR",
  "AR",
  "MA",
] as const;

export type VisitedCountryCode = (typeof MOCK_VISITED_COUNTRIES)[number];
