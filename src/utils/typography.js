import Typography from "typography"

const typography = new Typography({
  baseFontSize: "14px",
  baseLineHeight: 1.45,
  headerFontFamily: ["serif"],
  bodyFontFamily: ["Georgia", "serif"],
  bodyColor: "#fff",
  overrideStyles: () => ({
    html: {
      overflowY: "initial",
    },
    a: {
      color: "#fff",
      textDecoration: "underline",
    },
  }),
})

export const { scale, rhythm, options } = typography
export default typography
