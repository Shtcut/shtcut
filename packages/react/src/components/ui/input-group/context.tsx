import * as React from 'react';
import { TypeAttributes } from '../../../types';

const InputGroupContext = React.createContext<{ size?: TypeAttributes.ControlSize } | null>(null);

export const InputGroupContextProvider = InputGroupContext.Provider;

export const InputGroupContextConsumer = InputGroupContext.Consumer;

export function useInputGroup() {
    return React.useContext(InputGroupContext);
}

export default InputGroupContext;
