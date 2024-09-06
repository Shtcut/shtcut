import { ComponentPropsWithRef, ElementType, ReactElement, forwardRef } from 'react';
import { Merge } from '../types';

export type PrimitiveComponentProps<C extends ElementType = 'div', Props = {}> = Merge<ComponentPropsWithRef<C>, Props>;

export const primitiveComponent = <C extends ElementType = 'div', Props = {}>(
    render: (
        props: any,
        ref: any,
    ) => ReactElement | null,
) => {
    return forwardRef(render);
};

export const primitiveOmitComponent = <C extends ElementType = 'div', K extends string | number | symbol = never>(
    render: (props: any, ref?: any) => ReactElement | null,
) => {
    return forwardRef(render);
};
