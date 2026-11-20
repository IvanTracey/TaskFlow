import { useAppSelector } from '../store/hooks';
import { PALETTES } from '../constants/theme';

export const useTheme = () => {
  // Traigo el valor del tema seleccionado
  const mode = useAppSelector((state) => state.theme.mode);
  // Devuelvo ese valor y junto con la paleta de colores correspondiente
  return { mode, colors: PALETTES[mode] };
};