import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

// MD3 + colores propios de la marca que Material no define
export type AppTheme = MD3Theme & {
  colors: MD3Theme['colors'] & {
    success: string;
    successDisabled: string;
  };
};

export const lightTheme: AppTheme = {
  ...MD3LightTheme,
  roundness: 3,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2563EB',
    onPrimary: '#FFFFFF',
    primaryContainer: '#DBE4F5',
    onPrimaryContainer: '#0F172A',

    background: '#F5F8FF',
    onBackground: '#0F172A',

    surface: '#FFFFFF',
    onSurface: '#0F172A',
    surfaceVariant: '#EAF0FC',
    onSurfaceVariant: '#475569',
    surfaceDisabled: 'rgba(15, 23, 42, 0.12)',
    onSurfaceDisabled: '#94A3B8',

    outline: '#CBD5E8',
    outlineVariant: '#DBE4F5',

    error: '#DC2626',
    onError: '#FFFFFF',
    errorContainer: '#FEF2F2',
    onErrorContainer: '#7F1D1D',

    elevation: {
      level0: 'transparent',
      level1: '#FFFFFF',
      level2: '#F5F8FF',
      level3: '#EAF0FC',
      level4: '#E3EBFA',
      level5: '#DBE4F5',
    },

    success: '#16A34A',
    successDisabled: '#86EFAC',
  },
};

export const darkTheme: AppTheme = {
  ...MD3DarkTheme,
  roundness: 3,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4F8BFF',
    onPrimary: '#FFFFFF',
    primaryContainer: '#22305A',
    onPrimaryContainer: '#E8EEFF',

    background: '#0A1020',
    onBackground: '#E8EEFF',

    surface: '#152040',
    onSurface: '#E8EEFF',
    surfaceVariant: '#111A30',
    onSurfaceVariant: '#9FB0D6',
    surfaceDisabled: 'rgba(232, 238, 255, 0.12)',
    onSurfaceDisabled: '#6577A3',

    outline: '#2A3A6A',
    outlineVariant: '#22305A',

    error: '#F87171',
    onError: '#0A1020',
    errorContainer: '#2A1620',
    onErrorContainer: '#FECACA',

    elevation: {
      level0: 'transparent',
      level1: '#111A30',
      level2: '#152040',
      level3: '#1A2750',
      level4: '#1E2D58',
      level5: '#22305A',
    },

    success: '#4ADE80',
    successDisabled: '#14532D',
  },
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };