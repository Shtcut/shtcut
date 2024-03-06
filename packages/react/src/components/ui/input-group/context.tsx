'use client';

import { TypeAttributes } from '../../../types';
import {createContext, useContext } from 'react';

const InputGroupContext = createContext<{ size?: TypeAttributes.ControlSize } | null>(null);

export const InputGroupContextProvider = InputGroupContext.Provider;

export const InputGroupContextConsumer = InputGroupContext.Consumer;

export function useInputGroup() {
    return useContext(InputGroupContext);
}

export default InputGroupContext;
