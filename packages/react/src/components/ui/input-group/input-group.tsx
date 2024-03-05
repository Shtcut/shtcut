import * as React from 'react';
import { CommonProps, TypeAttributes } from '../../../types';
import { InputGroupContextConsumer, InputGroupContextProvider } from './context';
import { useConfig } from '../config-provider';
import { useForm } from '../form/context';
import { cn, primitiveComponent } from '../../../utils';
import '../../styles/_input-group.css';

export interface InputGroupProps extends CommonProps {
    size?: TypeAttributes.ControlSize;
}

const InputGroup = primitiveComponent<'div', InputGroupProps>((props, ref) => {
    const { children, className, size } = props;

    const { controlSize } = useConfig();
    const formControlSize = useForm()?.size;

    const inputGroupSize = size || formControlSize || controlSize;

    const inputGroupClass = cn('input-group', className);

    const contextValue = {
        size: inputGroupSize,
    };

    return (
        <InputGroupContextProvider value={contextValue}>
            <InputGroupContextConsumer>
                {() => {
                    return (
                        <div ref={ref} className={inputGroupClass}>
                            {children}
                        </div>
                    );
                }}
            </InputGroupContextConsumer>
        </InputGroupContextProvider>
    );
});

InputGroup.displayName = 'InputGroup';

export default InputGroup;
