# 🌲 MiApp – Tipos de Pinos

App móvil hecha con **React Native + Expo** que demuestra navegación con Stack y Tab Navigator, usando **React Native Paper** (Material Design 3) y una paleta de colores verdes minimalista.

## Características

- Lista de árboles con `FlatList`
- Pantalla de detalle con parámetros (`route.params`)
- Navegación por pestañas (Inicio y Perfil)
- Stack anidado dentro de la pestaña Inicio
- Estilos centralizados en `sharedStyles.ts`

## Tecnologías

- Expo / React Native
- React Navigation (`native-stack` y `bottom-tabs`)
- React Native Paper
- TypeScript

Luego escanea el QR con **Expo Go** o abre un emulador (Android / iOS).

```

## Navegación

| Método | Uso en la app |
| --- | --- |
| `navigation.navigate` | Home → Details (envía el `item`) |
| `navigation.push` | Details → siguiente elemento |
| `navigation.goBack` | Volver a la pantalla anterior |
| `useNavigation` | Componente `Header` (no es una pantalla) |

## Autor

Silva Mauricio – Alumno React Native
```
