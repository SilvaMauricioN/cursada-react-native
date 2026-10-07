export const lightColors = {
  // fondos
  background: '#FAFAFA',
  surface: '#F4F4F5',
  card: '#FFFFFF',

  // textos
  text: '#18181B',
  textSecondary: '#52525B',
  textDisabled: '#A1A1AA',

  // acciones y estados
  primary: '#18181B',
  success: '#16A34A',
  successDisabled: '#86EFAC',
  error: '#DC2626',
  errorBackground: '#FEF2F2',
  onPrimary: '#FFFFFF', // texto sobre botones de color

  // bordes e inputs
  border: '#E4E4E7',
  inputBackground: '#FFFFFF',
  inputBorder: '#E4E4E7',
  inputText: '#18181B',
  placeholder: '#A1A1AA',
};

// Colors define lo que debe cumplir cualquier tema:
// si falta una clave en un tema nuevo, TypeScript lo avisa.
export type Colors = typeof lightColors;

export const darkColors: Colors = {
  // fondos
  background: '#09090B',
  surface: '#18181B',
  card: '#18181B',

  // textos
  text: '#FAFAFA',
  textSecondary: '#A1A1AA',
  textDisabled: '#52525B',

  // acciones y estados
  primary: '#FAFAFA',
  success: '#4ADE80',
  successDisabled: '#14532D',
  error: '#F87171',
  errorBackground: '#2A1215',
  onPrimary: '#09090B',

  // bordes e inputs
  border: '#27272A',
  inputBackground: '#18181B',
  inputBorder: '#27272A',
  inputText: '#FAFAFA',
  placeholder: '#71717A',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };