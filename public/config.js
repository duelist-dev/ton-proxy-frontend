function setConfig(window) {
  window.env = window.env || {};
  window.env.VITE_DOMAIN_PROXY_URL = '${VITE_DOMAIN_PROXY_URL}';

  window.env.get = (key) => {
    const value = window.env[key]
    if (!value || value.startsWith('${') && value.endsWith('}')){
      return null;
    } else {
      return value;
    }
  }
  window.getEnv = (key) => {
   return window.env.get(key);
  }
}

setConfig(window);
