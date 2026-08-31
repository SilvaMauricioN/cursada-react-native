# React Native - Cursada

Repositorio del curso de **React Native (Expo)**. Cada clase se documenta y desarrolla como un proyecto de Expo independiente, dentro de una carpeta propia en este mismo repositorio.

## 📁 Estructura del monorepo

```
react-native-cursada/
├── README.md
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── eslint.config.js
├── package.json
├── package-lock.json
├── clase-01-intro/
├── clase-02-navegacion/
├── clase-03-estado/
└── ...
```

- Cada carpeta `clase-XX-tema/` es un **proyecto Expo completo e independiente** (tiene su propio `package.json`, `app.json`, `node_modules`, etc.).
- Todo vive en **un único repositorio git**, tanto local como remoto (no se usan submódulos).
- La configuración de **ESLint** y **Prettier** está centralizada en la raíz y aplica a todas las carpetas de clase.
