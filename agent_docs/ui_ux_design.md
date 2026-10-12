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

### 2. My Trips (`my-trip.tsx`)
- Large "My Trips" title with Planned / Past Trips toggle.
- Frosted white trip cards (`rounded-[32px]`) with 96×96 destination image, destination name, forest date badge + lime accent text, and ellipsis menu.
- White "Plan Manually" pill CTA that opens the onboarding wizard.
- Top-right person button navigates to Profile (`/profile`).

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
- **Itinerary markers (upcoming):** Custom markers using Primary Lime Green; selected markers slightly scale up.
- **Location Detail Overlay:** When a user taps a pin, display details in a floating `<BlurView>` matching itinerary action bars.

### 6. The Bookings Hub (bookings.tsx)
- **Layout:** Clean vertical lists with generous spacing.
- **Cards:** Heavily rounded white cards (`#FFFFFF`) on an off-white background (`#F8F9FA`) to create a subtle separation without using heavy drop shadows.
- **Badging:** Clear, pill-shaped tags to indicate status. 
  - "Booked": Subtle green background with dark green text.
  - "Suggested": Subtle gray background with dark gray text.