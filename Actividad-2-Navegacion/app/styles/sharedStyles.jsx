// import { StyleSheet } from 'react-native';
//
// export const SPACING = 16;
// export const RADIUS = 12;
//
// const sharedStyles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: '#f5f5f5' },
//   content: { flex: 1, padding: SPACING },
//   title: { fontSize: 28, fontWeight: 'bold', marginBottom: SPACING, color: '#1d1b20' },
//   card: {
//     marginBottom: SPACING,
//     borderRadius: RADIUS,
//     elevation: 2,
//     backgroundColor: '#fff',
//   },
//   fab: {
//     position: 'absolute',
//     margin: SPACING,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#d0bcff',
//   },
// });
//
// export default sharedStyles;

import { StyleSheet } from 'react-native';
import { MD3DarkTheme } from 'react-native-paper';

// Paleta "Bosque pino"
export const palette = {
  pine900: '#182c25',
  pine800: '#17392b',
  pine700: '#13442f',
  pine600: '#0e5332',
  text: '#E9EFE6',
  textMuted: '#9DB8A8',
};

// Múltiplos de 8
export const spacing = {
  xs: 8,
  sm: 16,
  lg: 32,
};

// Tema de React Native Paper
export const paperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.pine600,
    background: palette.pine900,
    surface: palette.pine800,
    onSurface: palette.text,
  },
};

// Estilos compartidos
export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.pine900,
    paddingHorizontal: spacing.sm,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: palette.text,
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: palette.textMuted,
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: palette.pine800,
    borderRadius: 16,
    marginBottom: spacing.sm,
  },
  cardContent: {
    padding: spacing.sm,
  },
  cardTitle: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '600',
  },
  cardText: {
    color: palette.textMuted,
    marginTop: 4,
  },
  button: {
    marginTop: spacing.sm,
    borderRadius: 16,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
});
