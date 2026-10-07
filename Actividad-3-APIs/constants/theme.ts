export const lightColors = {
  // fondos
  background: '#F5F8FF',
  surface: '#EAF0FC',
  card: '#FFFFFF',

  // textos
  text: '#0F172A',
  textSecondary: '#475569',
  textDisabled: '#94A3B8',

  // acciones y estados
  primary: '#2563EB',
  success: '#16A34A',
  successDisabled: '#86EFAC',
  error: '#DC2626',
  errorBackground: '#FEF2F2',
  onPrimary: '#FFFFFF', // texto sobre botones de color

  // bordes e inputs
  border: '#DBE4F5',
  inputBackground: '#FFFFFF',
  inputBorder: '#CBD5E8',
  inputText: '#0F172A',
  placeholder: '#94A3B8',
};

// Colors define lo que debe cumplir cualquier tema:
// si falta una clave en un tema nuevo, TypeScript lo avisa.
export type Colors = typeof lightColors;

export const darkColors: Colors = {
  // fondos
  background: '#0A1020',
  surface: '#111A30',
  card: '#152040',

  // textos
  text: '#E8EEFF',
  textSecondary: '#9FB0D6',
  textDisabled: '#5A6A90',

  // acciones y estados
  primary: '#4F8BFF',
  success: '#4ADE80',
  successDisabled: '#14532D',
  error: '#F87171',
  errorBackground: '#2A1620',
  onPrimary: '#FFFFFF',

  // bordes e inputs
  border: '#22305A',
  inputBackground: '#111A30',
  inputBorder: '#2A3A6A',
  inputText: '#E8EEFF',
  placeholder: '#6577A3',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };