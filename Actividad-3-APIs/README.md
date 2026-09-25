# RN JSONPlaceholder POST

App React Native (Expo) que crea un post en la API falsa
[JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/).

## Estructura

```
App.js                    -> UI (formulario + resultado)
hooks/useCreatePost.js     -> hook con la lógica del fetch/POST
package.json
```

## Cómo correrlo

```bash
npm install
npx expo start
```

Luego escaneá el QR con la app Expo Go (Android/iOS) o presioná `w` para
abrirlo en el navegador.

## Qué hace

1. El formulario pide `title`, `body` y `userId`.
2. Al tocar "Crear Post" se llama a `createPost()` (definida en el hook
   `useCreatePost`), que hace:

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({ title, body, userId }),
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
});
```

3. La respuesta (incluyendo el `id` fake que devuelve la API, normalmente
   `101`) se guarda en el estado del hook y se muestra debajo del formulario
   en la misma pantalla.

Nota: JSONPlaceholder no persiste realmente los datos, solo simula la
creación y devuelve un objeto con un id nuevo.
