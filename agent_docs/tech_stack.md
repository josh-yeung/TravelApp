# Tech Stack & Architecture

## Core Technologies
- **Frontend / Mobile:** React Native (0.86) with Expo SDK 57 + Expo Router
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Language:** TypeScript
- **Backend / Database:** Supabase (PostgreSQL, Auth, Edge Functions)
- **AI / Logic:** Google Gemini 1.5 Flash (via Edge Functions)
- **Validation:** Google Places API (via Edge Functions)
- **Maps:** MapLibre React Native (`@maplibre/maplibre-react-native`) — requires a custom dev client (not Expo Go)

## Project Structure
app/                  (Expo Router screens: index, plan, my-trip, profile)
components/           (Reusable UI: TripCard, ProfileWorldMap)
assets/geo/           (Country boundary GeoJSON for profile map shading)
lib/                  (Helpers: supabase client, api callers)
supabase/functions/   (Edge Functions: generate-trip)
app.json              (Expo config)
package.json          (Dependencies)

## Architectural Sovereignty
- **Frontend Responsibility:** The mobile app handles UI rendering, state management, and capturing user input. It does NOT hold secret API keys.
- **Backend Responsibility:** Supabase Edge Functions handle the heavy lifting. They receive constraints from the app, call Gemini to generate the itinerary, call Google Places to validate it, and return the sanitized data to the app.

## Error Handling Pattern
- Use standard `try/catch` blocks for asynchronous API calls.
- Always display a user-friendly fallback UI when an API call fails or times out.