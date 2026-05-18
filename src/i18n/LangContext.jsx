import { createContext, useContext } from 'react';
import { t as tFn } from './translations';

export const LangContext = createContext('en');

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const lang = useLang();
  return (key) => tFn(key, lang);
}
