import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode } from '../constants/theme';

const KEY = 'taskflow:themeMode';

export const loadThemeMode = async (): Promise<ThemeMode | null> => {
  try {
    const saved = await AsyncStorage.getItem(KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
};

export const saveThemeMode = async (mode: ThemeMode): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEY, mode);
  } catch {
    // si falla, el cambio funciona igual durante esta sesión
  }
};