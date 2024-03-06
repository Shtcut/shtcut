'use client';

import * as React from 'react';
import { CONTROL_SIZES, cn, primitiveComponent } from '../../../utils';
import { isEmpty, get, isNil } from 'lodash';
import { CommonProps, TypeAttributes } from '../../../types';
import { useConfig } from '../config-provider';
import { useForm } from '../form/context';
import { useInputGroup } from '../input-group/context';
import '../../styles/index.css';

export interface InputProps extends CommonProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    asElement?: React.ElementType;
    disabled?: boolean;
    invalid?: boolean;
    prefix?: string | React.ReactNode;
    size?: TypeAttributes.ControlSize;
    suffix?: string | React.ReactNode;
    textArea?: boolean;
    type?: React.HTMLInputTypeAttribute;
    unstyle?: boolean;
    field?: any;
    form?: any;
}

const Input = primitiveComponent<'input', InputProps>((props, ref) => {
    const {
        asElement: Component = 'input',
        className,
        disabled,
        invalid,
        size,
        prefix,
        suffix,
        textArea,
        type = 'text',
        style,
        unstyle = false,
        field,
        form,
        ...rest
    } = props;

    const [prefixGutter, setPrefixGutter] = React.useState(0);
    const [suffixGutter, setSuffixGutter] = React.useState(0);

    const { themeColor, controlSize, primaryColorLevel, direction } = useConfig();

    const formControlSize = useForm()?.size;
    const inputGroupSize = useInputGroup()?.size;

    const inputSize = size || inputGroupSize || formControlSize || controlSize;

    const fixControlledValue = (val: string | number | readonly string[] | undefined) => {
        if (typeof val === 'undefined' || val === null) {
            return '';
        }
        return val;
    };

    if ('value' in props) {
        rest.value = fixControlledValue(props.value);
        delete rest.defaultValue;
    }

    const isInvalid = React.useMemo(() => {
        let validate = false;
        if (!isEmpty(form)) {
            const { touched, errors } = form;
            const touchedField = get(touched, field.name);
            const errorField = get(errors, field.name);
            validate = touchedField && errorField;
        }
        if (typeof invalid === 'boolean') {
            validate = invalid;
        }
        return validate;
    }, [form, invalid, field]);

    const inputDefaultClass = 'input';
    const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`;
    const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within-border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`;
    const inputWrapperClass = `input-wrapper ${prefix || suffix ? className : ''}`;

    const inputClass = cn(
        inputDefaultClass,
        !textArea && inputDefaultClass,
        !isInvalid && inputFocusClass,
        !prefix && !suffix ? className : '',
        disabled && 'input-disabled',
        isInvalid && 'input-invalid' && textArea && 'input-textarea',
    );

    const prefixNode = React.useRef<HTMLDivElement>(null);
    const suffixNode = React.useRef<HTMLDivElement>(null);

    const getAffixSize = () => {
        if (!prefixNode.current && !suffixNode.current) {
            return;
        }
        const prefixNodeWidth = prefixNode?.current?.offsetWidth;
        const suffixNodeWidth = prefixNode?.current?.offsetWidth;

        if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
            return;
        }
        if (prefixNodeWidth) {
            setPrefixGutter(prefixNodeWidth);
        }
        if (suffixNodeWidth) {
            setSuffixGutter(suffixNodeWidth);
        }
    };

    React.useEffect(() => {
        getAffixSize();
    }, [prefix, suffix]);

    const remToPxConversion = (px: number) => 0.0625 * px;

    const affixGutterStyle = () => {
        const leftGutter = `${remToPxConversion(prefixGutter) + 1}rem`;
        const rightGutter = `${remToPxConversion(suffixGutter) + 1}rem`;

        const gutterStyle: {
            paddingLeft?: string;
            paddingRight?: string;
        } = {};

        if (direction === 'ltr') {
            if (prefix) {
                gutterStyle.paddingLeft = leftGutter;
            }

            if (suffix) {
                gutterStyle.paddingRight = rightGutter;
            }
        }

        if (direction === 'rtl') {
            if (prefix) {
                gutterStyle.paddingRight = leftGutter;
            }

            if (suffix) {
                gutterStyle.paddingLeft = rightGutter;
            }
        }
        return gutterStyle;
    };

    const inputProps = {
        className: !unstyle ? inputClass : '',
        disabled,
        type,
        ref,
        ...field,
        ...rest,
    };

    const renderTextArea = <textarea style={style} {...inputProps}></textarea>;

    const renderInput = <Component style={{ ...affixGutterStyle(), ...style }} {...inputProps} />;

    const renderAffixInput = (
        <span className={inputWrapperClass}>
            {prefix ? (
                <div ref={prefixNode} className="input-suffix-start">
                    {' '}
                    {prefix}{' '}
                </div>
            ) : null}
            {renderInput}
            {suffix ? (
                <div ref={suffixNode} className="input-suffix-end ">
                    {suffix}
                </div>
            ) : null}
        </span>
    );

    const renderChildren = () => {
        if (textArea) {
            return renderTextArea;
        }
        if (prefix || suffix) {
            return renderAffixInput;
        } else {
            return renderInput;
        }
    };

    return renderChildren();
});

Input.displayName = 'Input';

export default Input;
