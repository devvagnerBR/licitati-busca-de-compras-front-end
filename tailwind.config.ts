import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.tsx',
    "!./node_modules"
  ],
  theme: {
    extend: {
      screens: {
        "400": "400px",
        "500": "500px",
        "80ren": "1280px",
        "1200": "1200px",
        "xsm": "460px"

      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
      },
      fontSize: {
        "64": "64px",
        "52": "52px",
        "48": "48px",
        "42": "42px",
        "32": "32px",
        "28": "28px",
        "22": "22px",
        "20": "20px",
        "18": "18px",
        "16": "16px",
        "14": "14px",
      },
      lineHeight: {
        "1.5": "1.5",
        "1.4": "1.4",
        "1.2": "1.2",
        "1.1": "1.1",
        "1": "1",
      }

    },
  },
  plugins: [],
};
export default config;