export const Theme = {
    LightMode: 'lightMode',
    DarkMode: 'darkMode'
}

export const convertModeToTheme = (mode) => {
    return mode === Theme.LightMode ? 'lightTheme' : 'darkTheme';
}