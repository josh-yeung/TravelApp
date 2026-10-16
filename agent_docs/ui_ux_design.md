# UI/UX Design Guidelines

## Core Design Philosophy
- **Vibe:** Modern, immersive, premium, and nature-inspired.
- **Key Visuals:** Large edge-to-edge photography, heavy border radiuses (very rounded corners), and dark "glassmorphism" (frosted/translucent) overlapping elements.
- **Rule:** The UI should feel lightweight and float above the content.

## Design Tokens (Strict Styling Rules)

### 1. Color Palette
- **Backgrounds:** Soft off-white (`#F7FAFB`) for main app backgrounds; surface gray (`#F8F9FA`) for secondary panels.
- **Primary Accent:** Vibrant Lime/Neon Green (`#8DE175`). Used sparingly for Explore active states and legacy CTAs.
- **Forest:** Deep green (`#44655A`). Used for My Trips date badges, "Planned" labels, and the active Trips tab pill.
- **Olive:** Dark olive (`#536600`). Used for trip calendar selected-day circles and matching icon fills.
- **Lime Accent:** Chartreuse (`#B0D500`). Used for date-badge text/icons on forest backgrounds.
- **Typography Colors:**
  - Primary Headers/Titles: Very Dark Gray/Black (`#1A1A1A`).
  - Secondary Text/Subtitles: Medium Gray (`#8E8E93`).
- **Overlays (Glassmorphism):** Dark, semi-transparent overlays with background blur (e.g., `rgba(0,0,0,0.6)` with blur effect) on immersive screens; light translucent white (`rgba(255,255,255,0.75)`) for the floating tab dock.

### 2. Typography Hierarchy
- **Font:** Clean, modern Sans-Serif (system default or a Google Font like Poppins/Inter).
- **Headers:** Large, bold, tightly spaced (e.g., 28px - 32px for main screen titles).
- **Body Text:** Small, highly legible, with generous line height (e.g., 14px - 16px).

### 3. Component Styling Rules
- **Border Radius:** Use heavy rounding everywhere. Cards and images (`borderRadius: 24`), Buttons/Chips (`borderRadius: 9999`).
- **Glassmorphism Elements:** Map overlays and immersive CTAs use `expo-blur` (`<BlurView>`) with a dark tint. The primary floating tab dock uses a light translucent white pill with a thin black border (Figma Lume style).

## Key Screen Implementations

### 1. The Onboarding/Home Screen (index.tsx)
- Large, bold greeting.
- **Search Bar:** Very light gray, heavily rounded, minimal styling, with thin line icons.
- **Category Chips:** Pill-shaped horizontal scroll. Active chip has a white background, dark border, and a Lime Green icon.
- **Bottom Navigation:** 3-tab light floating dock — Explore / Plan / Trips. White translucent pill, thin black border; active tab uses a forest-green pill behind the icon.

### 1b. Plan — Where? (`(tabs)/plan/index.tsx`)
- Plan tab opens the first onboarding step (WHERE). Progress bars: WHERE olive, WHEN/WHAT/HOW muted; circular close returns to Explore.
- Large **Where?** title + white pill search (“Search destinations”).
- Swipeable **Trending** / **Saved** lists (fire / bookmark icons + page dots). Multi-select cards: white `rounded-[32px]`, 64×64 thumb; selected = olive `#536600` border + check.
- Floating olive **“N Selected →”** CTA when selection count ≥ 1 → navigates to When (`/plan/when`) with selected destination ids.

### 1c. Plan — When? (`(tabs)/plan/when.tsx`)
- Nested under Plan tab (floating tab dock stays visible). Progress: WHEN olive; circular **back** returns to Where.
- Large **When?** title + vertical month calendars (April 2026 + 11 months). Tap to set range (start → end; third tap resets).
- Selected days: olive filled circles + white numerals.
- Floating olive CTA when range complete: **“April 2 – April 9 →”** style label → navigates to What (`/plan/what`) with destinations + date range.

### 1d. Plan — What? (`(tabs)/plan/what.tsx`)
- Nested under Plan tab (floating tab dock stays). Progress: WHAT olive; circular **back** returns to When.
- Large **What?** title; featured white **Saved** card (bookmark + forest label) → `/plan/what-saved`.
- Activity rows: Landmarks / Restaurants / Nightlife / Nature / Shopping — mint icon circle, label, chevron (stubs).
- Floating olive **Surprise Me** + wand CTA (stub until HOW).

### 1e. Plan — What Saved (`(tabs)/plan/what-saved.tsx`)
- Same WHAT progress + back. Active mint `#edf8f4` Saved pill; search filters mock saved places.
- Section **SAVED** + place cards (thumb, name, city) — Louvre, Eiffel Tower, Notre Dame, Arc de Triomphe stubs.

### 2. My Trips (`my-trip.tsx`)
- Large "My Trips" title with Planned / Past Trips toggle.
- Frosted white trip cards (`rounded-[32px]`) with 96×96 destination image, destination name, forest date badge + lime accent text, and ellipsis menu.
- Tapping a trip card opens the Trip Calendar (`/trip/[id]`).
- White "Plan Manually" pill CTA that opens the onboarding wizard.
- Top-left bookmark is decorative (no navigation).
- Top-right person button navigates to Profile (`/profile`).

### 2b. Trip Calendar (`trip/[id].tsx`)
- Stack screen opened from a My Trips card; hides the tab bar.
- **Month mode:** circular back / map-pin (`#C5C9AC` borders). Vertically scrolling months (Sunday-first). Trip days highlighted olive (`#536600`); tap an in-range day to open day mode. Months span the trip range; single-month trips also show the following month. Map-pin opens trip Bookings (`/bookings/[tripId]`).
- **Day mode:** full-bleed MapLibre city map under a `@gorhom/bottom-sheet` panel (`#F7FAFB`, top radius 40, `#c5c9ac` drag handle).
  - Snap points: collapsed (~121px — date strip only) and expanded (~85% — strip + day header + spot timeline).
  - Date strip: trip days only; selected day olive circle. Header: large date title, forest destination, gray “Xkm • N spots” pill.
  - Spot cards: frosted white cards, lime `#d4ff00` numbered timeline rings, transit pill + book/nav action circles (visual stubs).
  - Map-pin opens trip Bookings; back from day mode returns to month mode; back from month mode returns to My Trips.

### 3. Profile (`profile.tsx`)
- Stack screen (hides tab bar) opened from Trips.
- Header: circular back / share / plus with `#C5C9AC` borders; centered “Profile” title.
- Interactive MapLibre world map (`ProfileWorldMap`) with countries GeoJSON fill — forest green for visited ISO codes from the in-memory visited store.
- Plus opens **Add countries** (`add-countries.tsx`) modal: search, A–Z list (flag + name + toggle), muted rows for already-visited (still editable), Save replaces visited set (add/remove); Back/Exit discard draft.
- Metric cards: countries visited + % of world progress bar (live from visited store).
- User card: avatar, name/age, country, trips/saved stats.
- Settings and Edit profile rows (UI stubs for now).

### 4. The Itinerary Timeline & Details (itinerary.tsx)
- Edge-to-edge header images with a subtle dark gradient overlay at the bottom so overlaid white text remains readable.
- Floating back buttons (circular, translucent dark background, white line icons).
- **Action Bar:** A floating dark glassmorphic bar at the bottom containing the main action (e.g., "Start your trip").

### 5. The Interactive Map (MapLibre)
- **Base Style:** Light MapLibre style (demo tiles for MVP; swap to a production tile provider later).
- **Profile world map:** Pan/zoom enabled; country fills via GeoJSON `Layer` typed `fill`, keyed by ISO code.
- **Trip day map (`TripDayMap`):** Full-bleed demotiles style; camera fits day spot bounds (or city center). Circle markers — olive fill + lime halo/stroke.
- **Location Detail Overlay (upcoming):** When a user taps a pin, display details in a floating `<BlurView>` matching itinerary action bars.

### 6. Trip Bookings (`bookings/[tripId].tsx`)
- Opened from trip calendar map-pin only (no cross-trip hub).
- Header: back + map-pin (map-pin returns to `/trip/[id]`).
- Trip title, calendar date range, hero image with bottom gradient.
- Forest **Bookings** heading; sections Flights / Stays / Cars with lime `#d4ff00` `+` stubs.
- Flight cards: frosted white `rounded-[32px]`, airport codes, plane path + olive duration, schedule row.
- Stays: empty state by default; plus (or CTA) expands frosted search card (`rounded-[48px]`) with Where/When/Who pills, lime Search CTA, and Deals From rows (Expedia / Tripadvisor / Airbnb) — stubs. Expanded: lime button becomes X and collapses back to empty state.
- Cars: dashed `#c5c9ac` empty placeholder with CTA text (stub).