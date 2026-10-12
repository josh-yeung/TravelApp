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
 * ISO_A2 codes shaded on the profile world map.
 * Swap this list later for persisted user travel history.
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

export const VISITED_COUNTRY_COUNT = MOCK_VISITED_COUNTRIES.length;

export const WORLD_PERCENT =
  Math.round((VISITED_COUNTRY_COUNT / MOCK_PROFILE.totalCountries) * 1000) / 10;
