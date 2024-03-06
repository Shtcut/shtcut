import * as React from 'react';
import { LAYOUT, SIZES, cn } from '../../../utils';
import { CommonProps, TypeAttributes } from '../../../types';
import { useConfig } from '../config-provider';
import { FormContextConsumer, FormContextProps, FormContextProvider } from './context';
import '../../styles/index.css';

export interface FormContainerProps extends CommonProps {
    size?: TypeAttributes.ControlSize;
    layout?: TypeAttributes.FormLayout;
    labelWidth?: string | number;
}

const FormContainer = (props: FormContainerProps) => {
    const { controlSize } = useConfig();

    const { children, className, labelWidth = 100, layout = LAYOUT.VERTICAL, size = SIZES.MD } = props;

    const contextValue = {
        labelWidth,
        layout,
        size: size || controlSize,
    };

    return (
        <FormContextProvider value={contextValue as FormContextProps}>
            <FormContextConsumer>
                {(context) => <div className={cn('form-container', context?.layout, className)}>{children}</div>}
            </FormContextConsumer>
        </FormContextProvider>
    );
};


FormContainer.displayName = 'FormContainer';

export default FormContainer;