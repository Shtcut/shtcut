import { ComponentPropsWithRef, ElementType, ForwardRefRenderFunction, ReactElement, forwardRef } from 'react';
import { Merge } from '../types';

type As<Props = any> = ElementType<Props>;

type PropsOf<T extends As> = ComponentPropsWithRef<T> & {
  as?: As;
};

type OmitCommonProps<Target, OmitAdditionalProps extends keyof any = never> = Omit<Target, 'as' | OmitAdditionalProps>;

type RightJoinProps<SourceProps extends object = {}, OverrideProps extends object = {}> = OmitCommonProps<
  SourceProps,
  keyof OverrideProps
> &
  OverrideProps;

type PolymorphicComponent<C extends ElementType = 'div', Props = {}> = Merge<ComponentPropsWithRef<C>, Props>;

export type PrimitiveComponentProps<C extends ElementType = 'div', Props = {}> = Merge<ComponentPropsWithRef<C>, Props>;

export const polymorphicComponent = <C extends As, Props extends object>(
  render: ForwardRefRenderFunction<any, RightJoinProps<PropsOf<C>, Props> & { as?: As }>,
) => {
  return forwardRef(render) as unknown as PolymorphicComponent<C, Props>;
};

export const primitiveComponent = <C extends ElementType = 'div', Props = {}>(
  render: (props: Merge<ComponentPropsWithRef<C>, Props>, ref?: ComponentPropsWithRef<C>['ref']) => ReactElement | null,
) => {
  return forwardRef(render);
};

export const primitiveOmitComponent = <C extends ElementType = 'div', K extends string | number | symbol = never>(
  render: (props: Omit<ComponentPropsWithRef<C>, K>, ref?: ComponentPropsWithRef<C>['ref']) => ReactElement | null,
) => {
  return forwardRef(render);
};