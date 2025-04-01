export function useConfig() {
  const get = (key: string): string | undefined => {
    if (typeof window !== 'undefined' && (window as any).getEnv) {
      const value = (window as any).getEnv(key);
      if (value !== undefined && value !== null) {
        return value;
      }
    }
    return import.meta.env[key];
  };

  return {
    get
  };
}
