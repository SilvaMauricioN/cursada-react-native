import { MD3DarkTheme } from 'react-native-paper';

/**
 * Paleta "Bosque pino"
 * #182c25 -> fondo general (el más oscuro)
 * #17392b -> superficies / cards
 * #13442f -> superficie secundaria / elementos elevados
 * #0e5332 -> color primario / acento (botones, tabs activos)
 */
export const pineColors = {
  background: '#182c25',
  surface: '#17392b',
  surfaceVariant: '#13442f',
  primary: '#0e5332',
  onPrimary: '#eef5f0',
  textPrimary: '#f2f0e6',
  textSecondary: '#b9c4bd',
  border: '#1f4534',
};

export const pineTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: pineColors.primary,
    onPrimary: pineColors.onPrimary,
    background: pineColors.background,
    onBackground: pineColors.textPrimary,
    surface: pineColors.surface,
    onSurface: pineColors.textPrimary,
    surfaceVariant: pineColors.surfaceVariant,
    onSurfaceVariant: pineColors.textSecondary,
    outline: pineColors.border,
    elevation: {
      level0: 'transparent',
      level1: pineColors.surface,
      level2: pineColors.surfaceVariant,
      level3: pineColors.surfaceVariant,
      level4: pineColors.surfaceVariant,
      level5: pineColors.surfaceVariant,
    },
  },
};