import { Config } from '@/utils/config.ts'

const DOMAIN_PROXY_URL = Config.get('VITE_DOMAIN_PROXY_URL')

export const prepareDomain = (value: string) => {
  return `https://${value}.${DOMAIN_PROXY_URL}`;
}

export const openDomain = (value: string, target = '_blank') => {
  window.open(prepareDomain(value), target);
}
