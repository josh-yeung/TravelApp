/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#8DE175",
        background: "#FFFFFF",
        surface: "#F8F9FA",
        heading: "#1A1A1A",
        subtitle: "#8E8E93",
        overlay: "rgba(0,0,0,0.6)",
      },
      borderRadius: {
        card: "24px",
        pill: "9999px",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },
    },
  },
  plugins: [],
};
