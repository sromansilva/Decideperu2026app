import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface AsyncActions<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
  setData: (data: T) => void;
}

/**
 * Hook para manejar operaciones asíncronas con estados de carga y error
 * Útil para llamadas a APIs, Supabase, etc.
 */
export function useAsync<T = any>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate: boolean = false
): AsyncState<T> & AsyncActions<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ data: null, loading: true, error: null });
      
      try {
        const response = await asyncFunction(...args);
        setState({ data: response, loading: false, error: null });
        return response;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        setState({ data: null, loading: false, error: err });
        throw err;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
  };
}

/**
 * Hook simplificado para fetch de datos
 */
export function useFetch<T = any>(
  url: string,
  options?: RequestInit
) {
  const fetchData = useCallback(async () => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }, [url, options]);

  return useAsync<T>(fetchData);
}

/**
 * Hook para operaciones con Supabase (placeholder)
 * TODO: Implementar cuando se integre Supabase
 */
export function useSupabaseQuery<T = any>(
  queryFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    
    try {
      const result = await queryFn();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Query failed');
      setState({ data: null, loading: false, error: err });
      throw err;
    }
  }, dependencies);

  return {
    ...state,
    refetch: execute,
  };
}
