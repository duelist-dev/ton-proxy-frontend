export class Config {

  static get(key: string): string | undefined {
    // Проверяем глобальные переменные (например, window.getEnv)
    if (typeof window !== 'undefined' && (window as { [key: string]: any }).getEnv) {
      const value = (window as { [key: string]: any }).getEnv(key);
      if (value !== undefined && value !== null) {
        return value;
      }
    }

    if (import.meta.env[key] !== undefined) {
      return import.meta.env[key];
    }
    return undefined;
  }

}
