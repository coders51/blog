/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Source Sans Pro", "sans-serif"]
      },
      colors: {
        coders51: "#0165a1",
        coders51dark: "#EBEBEB",
        darkBg: "#101720",
        lightBg: "#fff"
      },
      backgroundImage: {
        gradientDark:
          "radial-gradient(at 92.0% 25.0%, #1d4a74 0px, transparent 50%),radial-gradient(at 93.0% 58.0%, #17273a 0px, transparent 50%),radial-gradient(at 35.0% 38.0%, #17273a 0px, transparent 50%),radial-gradient(at 41.0% 31.0%, #101720 0px, transparent 50%),radial-gradient(at 16.0% 68.0%, #1d4a74 0px, transparent 50%)",
        gradientLight:
          "radial-gradient(at 87.0% 27.0%, #EBEBEB 0px, transparent 50%),radial-gradient(at 65.0% 37.0%, #c6c6c6 0px, transparent 50%),radial-gradient(at 56.0% 97.0%, #c6c6c6 0px, transparent 50%),radial-gradient(at 9.0% 97.0%, #EBEBEB 0px, transparent 50%),radial-gradient(at 52.0% 22.0%, #EBEBEB 0px, transparent 50%)",
        gradientHeader:
          "linear-gradient(to left, rgba(67, 76, 85, 0.85) 0%, rgba(17, 24, 32, 0.85) 100%)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
