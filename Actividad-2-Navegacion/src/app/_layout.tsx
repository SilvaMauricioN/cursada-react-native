import { DarkTheme as NavDarkTheme, NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from '../app/navigation/TabNavigator';
import { pineColors, pineTheme } from '../app/theme/Theme';

// Tema de navegación (fondo detrás de las pantallas durante transiciones)
const navTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    background: pineColors.background,
    card: pineColors.surface,
    primary: pineColors.primary,
    text: pineColors.textPrimary,
    border: pineColors.border,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={pineTheme}>
        <NavigationContainer theme={navTheme}>
          <TabNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}