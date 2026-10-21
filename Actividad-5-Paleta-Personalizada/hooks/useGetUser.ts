import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants/api';
import { User } from '../types/user';

interface UseUserResult {
  data: User | null;
  loading: boolean;
  error: string | null;
}

/** Obtiene un usuario por id (GET /users/:id). */
export default function useGetUser(id: string | undefined): UseUserResult {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetchUser = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }
        const json: User = await response.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'No se pudo cargar el usuario');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data, loading, error };
}