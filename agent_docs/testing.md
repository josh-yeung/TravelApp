# Testing & Verification Strategy

- **Local Development:** Continuously run the Expo development server (`npx expo start`) and test on a physical device via Expo Go or a local simulator.
- **Backend Verification:** Test Supabase Edge Functions locally using the Supabase CLI before deploying them.
- **API Cost Monitoring:** Manually verify Google Cloud Console billing to ensure Google Places calls are strictly limited to necessary validations.
- **Hallucination Checks:** Manually test edge-case destinations to ensure the "Two-Brain" system successfully filters out fake AI-generated places before they reach the UI.