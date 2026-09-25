// Datos que el usuario ingresa en el formulario y que se envían a la API
export interface CreatePostInput {
  title: string;
  body: string;
  userId: number;
}

// Respuesta que devuelve JSONPlaceholder al crear un post
export interface Post extends CreatePostInput {
  id: number;
}
