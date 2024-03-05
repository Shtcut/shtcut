'use client';

import * as React from 'react';
import { TypeAttributes } from '../../../types';

export type FormContextProps = {
    size?: TypeAttributes.ControlSize;
    layout?: TypeAttributes.FormLayout;
    labelWidth?: string | number;
};

const FormContext = React.createContext<FormContextProps | null>(null);

const FormContextProvider = FormContext.Provider;

const FormContextConsumer = FormContext.Consumer;

export function useForm() {
    return React.useContext(FormContext);
}

export default FormContext;
