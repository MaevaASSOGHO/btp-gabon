export default {
  theme: {
    extend: {
      animation: {
        scroll: "scroll 25s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
}