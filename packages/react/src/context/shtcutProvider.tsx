"use client";

import * as React from "react";


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
}
export const noop = () => {};
export const ThemeContext = React.createContext<ShtcutThemeProvider>({
    ...DefaultThemeOptions,
    setTheme: noop,
    setFontSans: noop,
})

export interface ThemeProvideOptions extends Partial<ShtcutThemeProvider>{
    children: React.ReactNode;
}

export function ShtcutUIProvider(props: ThemeProvideOptions) {
    const {children, ...providerValue } = props;
    const [currentTheme, setCurrentTheme] = React.useState<ShtcutThemeType>(props.theme || 'detect');
    const [currentFont, setCurrentFont] = React.useState<string | undefined>(props.fontSans);
    
}