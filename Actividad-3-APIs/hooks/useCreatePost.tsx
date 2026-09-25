import { useState } from 'react';
import { CreatePostInput, Post } from '../types/post';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface UseCreatePostResult {
  createPost: (input: CreatePostInput) => Promise<Post | null>;
  data: Post | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

/**
 * Hook encargado de la comunicación con la API falsa (JSONPlaceholder).
 * Expone el estado de la petición (loading, error, data) y la función
 * `createPost` que dispara el POST.
 */
export default function useCreatePost(): UseCreatePostResult {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async ({ title, body, userId }: CreatePostInput): Promise<Post | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
          userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const json: Post = await response.json();
      setData(json);
      return json;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ocurrió un error al crear el post';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = (): void => {
    setData(null);
    setError(null);
  };

  return { createPost, data, loading, error, reset };
}
