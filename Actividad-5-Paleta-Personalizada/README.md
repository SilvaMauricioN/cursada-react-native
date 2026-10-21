# Actividad 5 · Paleta de Marca Personalizada (Clase 7: Theming)

App hecha con **Expo Router**, **TypeScript** y **react-native-paper** (Material Design 3) que consume la API de [JSONPlaceholder](https://jsonplaceholder.typicode.com). Aplica una **paleta de marca azul personalizada** al tema de Paper, con **modo claro / oscuro**.

> **Nota:** este proyecto parte de la base de la Actividad 3 (consumo de APIs con JSONPlaceholder: listado de usuarios, detalle, y formularios de creación). Lo correspondiente a la **Actividad 5** es:
>
> - `constants/theme.ts`: temas MD3 claro y oscuro con la paleta de marca.
> - `context/ThemeContext.tsx`: modo claro/oscuro y acceso al tema de Paper.
> - `app/_layout.tsx`: `PaperProvider` envolviendo la app.
> - Uso de `Button`, `TextInput` y `Card` de react-native-paper en todas las pantallas.

## Pantallas

| Pestaña | Descripción |
|---|---|
| Usuarios | Lista de usuarios (`GET /users`) con buscador (`TextInput` de Paper). Al tocar uno se abre su detalle. Incluye el botón para cambiar de tema. |
| Nuevo usuario | Formulario para crear un usuario (`POST /users`). |
| Nuevo post | Formulario para crear un post (`POST /posts`). |

Además existe la pantalla de detalle: `app/user/[id].tsx` (`GET /users/:id`).

## Componentes de react-native-paper utilizados

| Componente | Dónde se usa |
|---|---|
| `Button` | Formularios (Crear usuario / Crear post / Limpiar) y botón "Reintentar" |
| `TextInput` | Buscador de usuarios y todos los campos de los formularios (vía `components/Field.tsx`) |
| `Card` | Tarjetas de usuario, resultado de la API y secciones del detalle |
| `Avatar`, `IconButton`, `ActivityIndicator`, `Text` | Avatares, botón de tema, carga y textos |

## Modo claro / oscuro

### Cómo usarlo

En la pantalla **Usuarios**, toca el botón circular de la esquina superior derecha:

- Icono de luna: cambia a modo oscuro.
- Icono de sol: cambia a modo claro.

El cambio es instantáneo en toda la app: pestañas, cabeceras, formularios y tarjetas.

### Capturas

#### Modo claro

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/light-users.png" width="220" alt="Usuarios en modo claro" /><br /><sub>Usuarios</sub></td>
    <td align="center"><img src="docs/screenshots/light-new-user.png" width="220" alt="Nuevo usuario en modo claro" /><br /><sub>Nuevo usuario</sub></td>
    <td align="center"><img src="docs/screenshots/light-new-post.png" width="220" alt="Nuevo post en modo claro" /><br /><sub>Nuevo post</sub></td>
  </tr>
</table>

#### Modo oscuro

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/dark-users.png" width="220" alt="Usuarios en modo oscuro" /><br /><sub>Usuarios</sub></td>
    <td align="center"><img src="docs/screenshots/dark-new-user.png" width="220" alt="Nuevo usuario en modo oscuro" /><br /><sub>Nuevo usuario</sub></td>
    <td align="center"><img src="docs/screenshots/dark-new-post.png" width="220" alt="Nuevo post en modo oscuro" /><br /><sub>Nuevo post</sub></td>
  </tr>
</table>

> Si las capturas son anteriores a la migración a Paper, volvé a sacarlas: los componentes ahora se ven distinto (inputs outlined, botones y tarjetas de Material Design 3).

### Cómo funciona

1. **`constants/theme.ts`** define dos temas, `lightTheme` y `darkTheme`, que **extienden `MD3LightTheme` y `MD3DarkTheme`** de react-native-paper y reemplazan sus colores por los de la marca. El tipo `AppTheme` suma los colores propios que Material no define (`success` y `successDisabled`).
2. **`context/ThemeContext.tsx`** guarda si el modo es oscuro y expone:
   - `isDark`: `true` o `false`
   - `toggleTheme()`: alterna entre ambos modos
   - `useThemeMode()`: hook para leer y cambiar el modo
   - `useAppTheme()`: hook que devuelve el tema activo de Paper, ya tipado como `AppTheme`
3. **`app/_layout.tsx`** envuelve toda la app con `<ThemeModeProvider>` y `<PaperProvider theme={isDark ? darkTheme : lightTheme}>`.
4. Los componentes de Paper (`Button`, `TextInput`, `Card`, etc.) leen los colores del tema automáticamente. Los componentes propios usan `useAppTheme()` y se vuelven a renderizar solo cuando el tema cambia.

### Paleta de marca (azul)

Los colores usan los **roles estándar de Material Design 3**:

| Rol MD3 | Uso | Claro | Oscuro |
|---|---|---|---|
| `background` | Fondo de pantallas | `#F5F8FF` | `#0A1020` |
| `onBackground` | Texto principal | `#0F172A` | `#E8EEFF` |
| `surface` | Tarjetas, barra de pestañas | `#FFFFFF` | `#152040` |
| `onSurface` | Texto sobre tarjetas | `#0F172A` | `#E8EEFF` |
| `surfaceVariant` | Superficies secundarias | `#EAF0FC` | `#111A30` |
| `onSurfaceVariant` | Texto secundario y pestañas inactivas | `#475569` | `#9FB0D6` |
| `primary` | Botones y acentos | `#2563EB` | `#4F8BFF` |
| `onPrimary` | Texto sobre botones | `#FFFFFF` | `#FFFFFF` |
| `outline` | Borde de inputs | `#CBD5E8` | `#2A3A6A` |
| `outlineVariant` | Bordes de tarjetas y separadores | `#DBE4F5` | `#22305A` |
| `error` | Mensajes de error | `#DC2626` | `#F87171` |
| `errorContainer` | Fondo de mensajes de error | `#FEF2F2` | `#2A1620` |
| `onSurfaceDisabled` | Elementos deshabilitados | `#94A3B8` | `#6577A3` |

Colores propios de la marca (fuera de MD3):

| Token | Claro | Oscuro |
|---|---|---|
| `success` | `#16A34A` | `#4ADE80` |
| `successDisabled` | `#86EFAC` | `#14532D` |

Para cambiar los colores, edita solo `constants/theme.ts`. Si agregas un color propio, súmalo al tipo `AppTheme` y a **ambos** temas.

### Accesibilidad

Las pestañas inactivas usan `onSurfaceVariant` en lugar de un color deshabilitado, para que se lean bien también en modo oscuro (`#9FB0D6` sobre `#152040`).

### Comportamiento actual

- La app **siempre arranca en modo claro**.
- La elección **no se guarda** al cerrar la app.

## Cómo correrlo

```bash
npm install
npx expo start
```

## Estructura

```
├── app/
│   ├── _layout.tsx            ThemeModeProvider + PaperProvider + Stack
│   ├── (tabs)/
│   │   ├── _layout.tsx        Barra de navegación inferior
│   │   ├── index.tsx          Usuarios + buscador + botón de tema
│   │   ├── new-user.tsx
│   │   └── new-post.tsx
│   └── user/[id].tsx          Detalle de usuario
├── components/                Field, Feedback, UserCard, ThemeToggle
├── constants/                 theme.ts (temas MD3), api.ts
├── context/                   ThemeContext.tsx
├── hooks/                     useUsers, useUser, useCreateUser, useCreatePost
└── types/                     user.ts, post.tsx
```