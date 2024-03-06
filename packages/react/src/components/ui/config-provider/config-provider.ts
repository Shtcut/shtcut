'use client';

import { ColorLevel, TypeAttributes } from '../../../types';
import { SIZES } from '../../../utils/constants';
import { createContext, useContext } from 'react';

export type Config = {
  themeColor: string;
  mode: 'light' | 'dark';
  locale: string;
  primaryColorLevel: ColorLevel;
  cardBordered: boolean;
  controlSize: TypeAttributes.ControlSize;
  navMode: TypeAttributes.MenuVariant;
  direction: TypeAttributes.Direction;
};

export const defaultConfig = {
  themeColor: 'blue',
  direction: 'ltr',
  mode: 'light',
  locale: 'en',
  primaryColorLevel: 600,
  cardBordered: false,
  controlSize: SIZES.MD,
  navMode: 'light',
} as const;

export const ConfigContext = createContext<Config>(defaultConfig);

const ConfigProvider = ConfigContext.Provider;

export const ConfigConsumer = ConfigContext.Consumer;

export function useConfig() {
  return useContext(ConfigContext);
}

export default ConfigProvider;
