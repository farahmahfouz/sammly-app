/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      /* =========================
         Colors
      ========================= */
      colors: {
        primary: "#6847E8",
        primaryDark: "#5133C9",
        primaryLight: "#F0EBFF",

        navy: "#071B41",
        navyLight: "#17315A",

        background: "#FFFDFC",
        surface: "#FFFFFF",
        surfaceLavender: "#F5F2FF",
        surfacePink: "#FCEBFA",
        surfaceGray: "#f7fbfe",
        surfacePurple: "#e6e3eef2",

        textPrimary: "#10213F",
        textSecondary: "#667085",
        textMuted: "#98A2B3",

        border: "#E6E8EF",
        borderLight: "#F0F1F5",

        yellow: "#F4B51B",
        green: "#236B57",
        error: "#BA1A1A",

        /* Your old colors */
        lightBackGround: "#F5F5F5",
        SecondaryColor: "#4e7f62",
        buttonColor: "#81B3DC",
        hoverButton: "#61D1DD",
        textColor: "#CE6ADA",
        "custom-bg": "rgb(104 42 34)",
      },

      /* =========================
         Font Sizes
      ========================= */
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
      },

      /* =========================
         Spacing
      ========================= */
      spacing: {
        1: "0.25rem", // 4px
        2: "0.5rem", // 8px
        3: "0.75rem", // 12px
        4: "1rem", // 16px
        5: "1.25rem", // 20px
        6: "1.5rem", // 24px
        8: "2rem", // 32px
        10: "2.5rem", // 40px
        12: "3rem", // 48px
        16: "4rem", // 64px
        20: "5rem", // 80px
        24: "6rem", // 96px
      },

      /* =========================
         Border Radius
      ========================= */
      borderRadius: {
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        full: "9999px",
      },

      /* =========================
         Box Shadows
      ========================= */
      boxShadow: {
        // sm: "0 1px 3px rgba(16, 33, 63, 0.06)",
        // md: "0 4px 12px rgba(16, 33, 63, 0.08)",
        // lg: "0 10px 30px rgba(16, 33, 63, 0.10)",

        cardShadow: "0 2px 6px #6847e81c",
      },

      /* =========================
         Container
      ========================= */
      maxWidth: {
        container: "700px",
      },

      /* =========================
         Screens
      ========================= */
      screens: {
        smplus: "430px",
        mdplus: "1024px",
        lgplus: "1270px",
        custom: "1223px",
      },

      /* =========================
         Font Family
      ========================= */
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        handwritten: ["Caveat", "cursive"],
      },
    },
  },

  daisyui: {
    themes: ["light"],
  },

  plugins: [require("daisyui")],
};
