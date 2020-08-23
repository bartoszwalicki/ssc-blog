import Typography from "typography"

const typography = new Typography({
    baseFontSize: '14px',
    baseLineHeight: 1.45,
    headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
    bodyFontFamily: ['Georgia', 'serif'],
    bodyColor: '#fff',
    overrideStyles: () => ({
        html: {
            overflowY: 'initial',
        },
    }),
})

export const { scale, rhythm, options } = typography
export default typography
