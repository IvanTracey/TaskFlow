
export const MARGIN = {
    marginXS: 10, 
    marginS: 20, 
    marginM: 30, 
    marginL: 40, 
}

export const SIZE = {
    fontSmall: 16,
    fontMedium: 20,
    fontLarge: 24,
    fontXLarge: 30,
    fontTitle: 36,
}

export type ThemeMode = 'light' | 'dark';

const light = { 
    screen: '#E0F2F1',
    surface: '#FFFFFF',
    text: '#0F1F1E',
    textMuted: '#546E7A',
    border: '#90A4AE',
    accent: '#20a798',
    onAccent: '#0F1F1E',
    success: '#4fa253',
    danger: '#c77b7b',
    error: '#c77b7b',
};
export type Palette = typeof light;

const dark: Palette = { 
    screen: '#0F1716',
    surface: '#3d6c68',
    text: '#E6F0EF',
    textMuted: '#9DB2B0',
    border: '#34504E',
    accent: '#26A69A',
    onAccent: '#00201E',
    success: '#4fa253',
    danger: '#c77b7b',
    error: '#c77b7b',
};
export const PALETTES: Record<ThemeMode, Palette> = { light, dark };