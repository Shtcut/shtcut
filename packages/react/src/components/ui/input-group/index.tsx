import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import _InputGroup, { InputGroupProps } from './input-group';
import Addon from './addon';

export type { InputGroupProps } from './input-group';
export type { AddonProps } from './addon';

type CompoundedComponent = ForwardRefExoticComponent<InputGroupProps & RefAttributes<HTMLDivElement>> & {
    Addon: typeof Addon;
};

const InputGroup = _InputGroup as CompoundedComponent;

InputGroup.Addon = Addon;

export { InputGroup };

export default InputGroup;
