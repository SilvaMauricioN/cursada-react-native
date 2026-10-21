import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import { darkTheme, lightTheme } from '../constants/theme';
import { ThemeModeProvider, useAppTheme, useThemeMode } from '../context/ThemeContext';

// Va DENTRO de PaperProvider porque usa useAppTheme()
function ThemedStack() {
  const theme = useAppTheme();
  const { isDark } = useThemeMode();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
          headerTintColor: theme.colors.onBackground,
          headerTitleStyle: { fontWeight: '600', fontSize: 16 },
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="user/[id]" options={{ title: 'Detalle', headerBackTitle: 'Atrás' }} />
      </Stack>
    </>
  );
}

// Elige el tema de Paper según el modo
function PaperShell() {
  const { isDark } = useThemeMode();

  return (
    <PaperProvider theme={isDark ? darkTheme : lightTheme}>
      <ThemedStack />
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeModeProvider>
      <PaperShell />
    </ThemeModeProvider>
  );
}