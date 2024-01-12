'use client';

import * as React from 'react';
import { CssBaseLine, isBrowser } from '../utils';

export type ShtcutThemeType = 'dark' | 'light' | 'system' | 'detect';

export interface ShtcutThemeContext {
  theme: ShtcutThemeType;
  disableBaseline: boolean;
  fontSans?: string;
}

export const DefaultThemeOptions: ShtcutThemeContext = {
  theme: 'light',
  disableBaseline: true,
};

export type ShtcutThemeProvider = ShtcutThemeContext & {
  setTheme: React.Dispatch<React.SetStateAction<ShtcutThemeType>>;
  setFontSans: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export const noop = () => {};
export const ThemeContext = React.createContext<ShtcutThemeProvider>({
  ...DefaultThemeOptions,
  setTheme: noop,
  setFontSans: noop,
});

export interface ThemeProvideOptions extends Partial<ShtcutThemeProvider> {
  children: React.ReactNode;
}

export function ShtcutUIProvider(props: ThemeProvideOptions) {
  const { children, ...providerValue } = props;
  const [currentTheme, setCurrentTheme] = React.useState<ShtcutThemeType>(props.theme || 'detect');
  const [currentFont, setCurrentFont] = React.useState<string | undefined>(props.fontSans);

  React.useEffect(() => {
    if (isBrowser()) {
      if (currentTheme === 'detect') {
        const stored = (window.localStorage.getItem('theme') || 'light') as ShtcutThemeType;

        setCurrentTheme(['light', 'dark', 'system'].includes(stored) ? stored : 'light');

        return;
      }
      if (currentTheme !== 'system') {
        window.localStorage.setItem('theme', currentTheme);
        document.documentElement.classList.value = currentTheme;
        return;
      }
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent | MediaQueryList) => {
        setCurrentTheme(e.matches ? 'dark' : 'light');
      };
      listener(mediaQuery);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        ...DefaultThemeOptions,
        ...providerValue,
        theme: currentTheme,
        setTheme: setCurrentTheme,
        setFontSans: setCurrentFont,
      }}
    >
      {!props.disableBaseline && <CssBaseLine fontSans={currentFont} />}
      {children}
    </ThemeContext.Provider>
  );
}
