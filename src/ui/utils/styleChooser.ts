import { colorThemeStore } from "../stores/ThemeStore"

export const currentStyle = (s1 : string, s2 : string) => {
    return colorThemeStore.getState().theme === "dark" ? s1 : s2
}