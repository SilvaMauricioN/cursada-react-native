import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './navigation/TabNavigator';

/**
 * App: Punto de entrada principal de la aplicación.
 *
 * Aquí configuramos los "Providers", que son componentes que proveen
 * funcionalidades a toda la aplicación (estilos, áreas seguras, etc).
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3LightTheme}>
        <StatusBar style="dark" />
        <TabNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
