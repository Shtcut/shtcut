'use client';

import * as React from 'react';
import { CommonProps, TypeAttributes } from '../../../types';
import { useConfig } from '../config-provider';
import { useForm } from '../form/context';
import { useInputGroup } from './context';
import { CONTROL_SIZES, cn, primitiveComponent } from '../../../utils';
import '../../styles/index.css'

export interface AddonProps extends CommonProps {
    size?: TypeAttributes.ControlSize;
}

const Addon = primitiveComponent<'div', AddonProps>((props, ref) => {
    const { size, children, className } = props;

    const { controlSize } = useConfig();
    const formControlSize = useForm()?.size;
    const inputGroupSize = useInputGroup()?.size;

    const inputAddonSize = size || inputGroupSize || formControlSize || controlSize;

    const addonClass = cn('input-addon', `input-addon-${inputAddonSize} h-${CONTROL_SIZES[inputAddonSize]}`, className);

    return (
        <div ref={ref} className={addonClass}>
            {children}
        </div>
    );
});

Addon.displayName = 'Addon';

export default Addon;
