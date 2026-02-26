import es from './es.json';
import en from './en.json';

export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es,
  en,
} as const;

export function getLangFromUrl(url: URL) {
  const pathname = url.pathname;
  const segments = pathname.split('/').filter(Boolean);
  
  // Si hay un base path (ej: portfolio), lo ignoramos
  const possibleLang = segments[0] === 'portfolio' ? segments[1] : segments[0];
  
  if (possibleLang in ui) return possibleLang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = ui[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const parts = pathname.split('/');
  const lang = parts[1];
  
  if (lang in ui) {
    parts.splice(1, 1);
  }
  
  return parts.join('/') || '/';
}

export function translatePath(path: string, lang: keyof typeof ui, base: string = '') {
  const cleanBase = base.replace(/\/$/, '');
  if (lang === defaultLang) {
    return `${cleanBase}${path}`;
  }
  return `${cleanBase}/${lang}${path}`;
}

export function getLocalizedPath(currentPath: string, targetLang: keyof typeof ui, base: string = '') {
  const cleanBase = base.replace(/\/$/, '');
  const pathWithoutBase = currentPath.replace(cleanBase, '');
  const segments = pathWithoutBase.split('/').filter(Boolean);
  
  // Remover el idioma actual si existe
  const currentLang = segments[0] in ui ? segments[0] : null;
  const pathWithoutLang = currentLang ? '/' + segments.slice(1).join('/') : pathWithoutBase;
  
  // Si el idioma objetivo es el default, no agregamos prefijo
  if (targetLang === defaultLang) {
    return `${cleanBase}${pathWithoutLang || '/'}`;
  }
  
  // Agregar el idioma objetivo
  return `${cleanBase}/${targetLang}${pathWithoutLang || ''}`;
}
