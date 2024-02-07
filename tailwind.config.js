const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      DEFAULT: "6px 13px 44px rgba(0, 0, 0, 0.25)",
      sm: "3px 6px 22px rgba(0, 0, 0, 0.25)",
      xs: "1px 3px 10px rgba(0, 0, 0, 0.25)",
    },
    borderRadius: {
      DEFAULT: "70px",
      xs: "0.25rem",
      sm: "0.5rem",
      full: "9999px",
    },
    colors: {
      brandPrimary: {
        DEFAULT: "#efc739",
        300: "#f5dd88",
        1000: "#bf9f2e",
      },
      brandSecondary: {
        DEFAULT: "#0495b7",
        100: "#e6f4f8",
        300: "#82cadb",
        1000: "#037792",
      },
      brandTerciary: {
        DEFAULT: "#651cc2",
        100: "#f1e9fb",
        300: "#a979e8",
        1000: "#5a19ad",
      },
      functionalSuccess: {
        DEFAULT: "#49bf78",
        300: "#92d9ae",
      },
      functionalDanger: {
        DEFAULT: "#cc4040",
        300: "#e3a0a0",
      },
      functionalWarning: {
        DEFAULT: "#ee923e",
        300: "#f5be8b",
      },
      dark: "#202021",
      transparent: "transparent",
      current: "currentColor",
      orange: {
        DEFAULT: "#EE923E",
        100: "#FFEDD5",
      },
      blue: colors.blue,
      skyblue: {
        DEFAULT: "#1383F7",
      },
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      coolGray: colors.coolGray,
      navy: {
        DEFAULT: "#252950",
      },
      black: {
        DEFAULT: "#000",
      },

      background: "#EDF7FA",
      footer: {},
      cyan: colors.cyan,
      green: colors.green,
      emerald: colors.emerald,
    },
    extend: {
      zIndex: {
        2000: "2000",
      },
      fontFamily: {
        nexa: ["Nexa Bold", "sans-serif"],
        "nexa-light": ["Nexa Light", "sans-serif"],
        "nexa-regular": ["Nexa Regular", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        "rubik-regular": ["Rubik Regular", "sans-serif"],
        "rubik-medium": ["Rubik Medium", "sans-serif"],
        "rubik-bold": ["Rubik Bold", "sans-serif"],
      },
      lineHeight: {
        12: "3.375rem",
      },
      backgroundImage: {
        cellphone: "url('./images/securityCheck.png')",
        "dawn-grad":
          "linear-gradient(146.12deg, rgba(61, 203, 160, 0.6) 28.53%, rgba(239, 199, 57, 0.6) 79.91%)",
        "dusk-grad":
          "linear-gradient(146.12deg, rgba(158, 75, 190, 0.6) 28.53%, rgba(0, 167, 254, 0.426) 79.91%)",
        "blue-green-grad": "linear-gradient(135deg, #84CAF0 0%, #83D9BB 100%);",
      },
      colors: {
        zestygreen: {
          DEFAULT: "rgba(73, 191, 120, 1)",
        },
        header: {
          DEFAULT: "rgba(32, 32, 33, 1)",
        },
        footer: {
          DEFAULT: "rgba(32, 32, 33, 1)",
        },
        mustard: {
          DEFAULT: "rgba(224, 169, 62, 1)",
        },
        blue: {
          DEFAULT: "rgba(0, 167, 254, 1)",
          800: "#007A94",
          900: "#701FD8",
        },
        green: {
          900: "#00813F",
        },
        grey: {
          DEFAULT: "rgb(128,128,128)",
          100: "#e9e9e9",
          300: "#bcbcbc",
          500: "#636364",
          600: "#76797E",
          800: "#363637",
        },
        purple: {
          DEFAULT: "rgba(158, 75, 190, 1)",
          500: "#701FD8",
          600: "#6321BE",
          700: "#5523A2",
          800: "#5523A2",
        },
        bluepurple: {
          DEFAULT: "rgba(64, 78, 204, 1)",
          400: "#404ECC",
        },
        darkblue: {
          DEFAULT: "rgba(4, 149, 183, 1)",
        },
        electricBlue: {
          DEFAULT: "rgba(76, 50, 255, 1)",
          500: "#4C32FF",
          600: "#4330D5",
          700: "#392EA7",
          800: "#302C7F",
        },
        pink: {
          600: "#CD2FCD",
        },
        slider: {
          DEFAULT: "#424b5a",
        },
      },
      dropShadow: {
        "sm-alt": "0px 4px 4px rgba(0, 0, 0, 0.15)",
      },
      fontSize: {
        baseplus: [
          "17px",
          {
            lineHeight: "22px",
            letterSpacing: "0.05em",
          },
        ],
      },
      spacing: {
        fit: "fit-content",
      },
      height: {
        17: "4.5rem",
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".hard-center": {
          position: `absolute`,
          top: `50%`,
          left: `50%`,
          transform: `translate(-50%, -50%)`,
        },

        ".increase-touch-target": {
          position: `relative`,
          "&::after": {
            content: `""`,
            position: `absolute`,
            left: `50%`,
            top: `50%`,
            transform: `translate(-50%, -50%)`,
            minWidth: `40px`,
            minHeight: `40px`,
          },
        },
      });
    }),
  ],
  mode: "jit",
};
