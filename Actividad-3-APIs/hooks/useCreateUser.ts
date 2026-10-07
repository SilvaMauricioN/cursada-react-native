import { useState } from 'react';
import { API_BASE_URL } from '../constants/api';
import { CreatedUser, CreateUserInput } from '../types/user';

interface UseCreateUserResult {
  createUser: (input: CreateUserInput) => Promise<CreatedUser | null>;
  data: CreatedUser | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

/** Crea un usuario (POST /users). */
export default function useCreateUser(): UseCreateUserResult {
  const [data, setData] = useState<CreatedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (input: CreateUserInput): Promise<CreatedUser | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const json: CreatedUser = await response.json();
      setData(json);
      return json;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error al crear el usuario');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = (): void => {
    setData(null);
    setError(null);
  };

  return { createUser, data, loading, error, reset };
}