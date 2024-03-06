'use client';

import { createContext, useContext } from 'react';
import { TypeAttributes } from '../../../types';

export type FormContextProps = {
    size?: TypeAttributes.ControlSize;
    layout?: TypeAttributes.FormLayout;
    labelWidth?: string | number;
};

const FormContext = createContext<FormContextProps | null>(null);

export const FormContextProvider = FormContext.Provider;

export const FormContextConsumer = FormContext.Consumer;

export function useForm() {
    return useContext(FormContext);
}

export default FormContext;
