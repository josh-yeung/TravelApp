# AGENTS.md — Master Plan for [App Name]

## Project Overview
**App:** [App Name]
**Goal:** A one-stop-shop travel app that generates logistically sound, day-by-day itineraries with interactive maps and direct booking links.
**Stack:** React Native (Expo), TypeScript, Supabase, Gemini API, Google Places API, Mapbox.
**Current Phase:** Phase 1 — Foundation & Initialization

## How I Should Think (Level C: Learning & Building)
1. **Explain the "Why":** The user is learning while building. Before providing a block of code, briefly explain the architectural concept or design pattern being used.
2. **Understand Intent First:** Identify what the user actually needs to achieve before answering.
3. **Plan Before Coding:** Propose a step-by-step approach, ask for approval, and then implement.
4. **Verify After Changes:** Remind the user to check Expo logs or Supabase Edge Function logs after each major change.
5. **Explain Trade-offs:** When suggesting a library or approach, mention the alternatives and why this one is best for an MVP.

## Plan → Execute → Verify
1. **Plan:** Outline the technical approach for the current feature and wait for approval.
2. **Execute:** Implement one feature or component at a time.
3. **Verify:** Check for TypeScript errors and run manual checks in the Expo simulator before moving on.

## Context & Memory
- Treat `AGENTS.md` and `agent_docs/` as living documents. Update them as the project evolves.
- Use `.cursorrules` for persistent, strictly enforced project guidelines.

## Context Files
- `agent_docs/tech_stack.md`: Frameworks, libraries, and architecture rules.
- `agent_docs/project_brief.md`: Persistent project rules and conventions.
- `agent_docs/product_requirements.md`: Core MVP scope and user stories.
- `agent_docs/ui_ux_design.md`: Visual guidelines, layout rules, and component styling.
- `agent_docs/testing.md`: Verification strategy.

## Current State (Update This!)
**Last Updated:** March 4, 2026
**Working On:** Set up Supabase project and Edge Functions directory
**Recently Completed:** Initialized Expo app (SDK 54) with TypeScript, Expo Router, NativeWind v4, Poppins font, expo-blur, expo-linear-gradient
**Blocked By:** None

## Roadmap
### Phase 1: Foundation
- [x] Initialize React Native Expo app with TypeScript and NativeWind (Tailwind)
- [ ] Set up Supabase project and Edge Functions directory
- [ ] Configure environment variables securely

### Phase 2: Core Features
- [ ] Build Smart Onboarding Prompt (Destination, dates, budget, vibes)
- [ ] Implement "Two-Brain" System (Gemini generation + Google Places validation via Edge Functions)
- [ ] Build Interactive Timeline (Drag-and-drop cards)
- [ ] Integrate Mapbox UI for visual routing
- [ ] Build Integrated Bookings Hub

## What NOT To Do
- Do NOT expose Google or Gemini API keys in the mobile frontend (use Supabase Edge Functions).
- Do NOT call Google Places API unnecessarily; strictly manage calls to stay within the free tier.
- Do NOT add features not listed in the MVP scope (e.g., social collaboration).
- Do NOT use the `any` type in TypeScript. Use `unknown` with type guards.