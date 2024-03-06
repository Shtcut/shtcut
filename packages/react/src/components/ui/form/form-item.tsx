'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { CommonProps, TypeAttributes } from '../../../types';
import { CONTROL_SIZES, LAYOUT, cn, primitiveComponent } from '../../../utils';
import { useForm } from './context';
import { useConfig } from '../config-provider';
import '../../styles/index.css';


export interface FormItemProps extends CommonProps {
    asterisk?: boolean;
    errorMessage?: string;
    extra?: string | ReactNode;
    htmlFor?: string;
    invalid?: boolean | '';
    label?: string;
    labelClass?: string;
    labelWidth?: string | number;
    layout?: TypeAttributes.FormLayout;
    size?: TypeAttributes.ControlSize;
}

const FormItem = primitiveComponent<'div', FormItemProps>((props, ref) => {
    const {
        asterisk,
        children,
        className,
        errorMessage,
        extra,
        htmlFor,
        invalid,
        label,
        labelClass,
        labelWidth,
        layout,
        style,
        size,
    } = props;

    const formContext = useForm();
    const { controlSize } = useConfig();

    const formItemLabelHeight = size || formContext?.size || controlSize;
    const formItemLabelWidth = labelWidth || formContext?.labelWidth;
    const formItemLayout = layout || formContext?.layout;

    const getFormLayoutClass = () => {
        switch (formItemLayout) {
            case LAYOUT.HORIZONTAL:
                return label
                    ? `h-${CONTROL_SIZES[formItemLabelHeight]} ${label && 'ltr:pr-2 rtl:pl-2'}`
                    : `ltr:pr-2 rtl:pl-2`;
            case LAYOUT.VERTICAL:
                return `mb-2`;
            case LAYOUT.INLINE:
                return `h-${CONTROL_SIZES[formItemLabelHeight]} ${label && 'ltr:pr-2 rtl:pl-2'}`;
            default:
                break;
        }
    };

    const formItemClass = cn('form-item', formItemLayout, className, invalid ? 'invalid' : '');
    const formLabelClass = cn('form-label', label && getFormLayoutClass(), labelClass);
    const formLabelStyle = () => {
        if (formItemLayout === LAYOUT.HORIZONTAL) {
            return { ...style, ...{ minWidth: formItemLabelWidth } };
        }
        return { ...style };
    };

    const enterStyle = { opacity: 1, marginTop: 3, bottom: -21 };
    const exitStyle = { opacity: 0, marginTop: -10 };
    const initialStyle = exitStyle;

    return (
        <div ref={ref} className={formItemClass}>
            <label htmlFor={htmlFor} className={formLabelClass} style={formLabelStyle()}>
                {asterisk && <span className="text-red-500 ltr:mr-1 rtl:ml-1">*</span>}
                {label}
                {extra && <span>{extra}</span>}
                {label && formItemLayout !== 'vertical' && ':'}
            </label>
            <div className={formItemLayout === LAYOUT.HORIZONTAL ? 'w-full flex flex-col justify-center relative' : ''}>
                {children}
                <AnimatePresence mode="wait">
                    {invalid && (
                        <motion.div
                            className="form-explain"
                            initial={initialStyle}
                            animate={enterStyle}
                            exit={exitStyle}
                            transition={{ duration: 0.15, type: 'tween' }}
                        >
                            {errorMessage}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
});

FormItem.displayName = 'FormItem';

export default FormItem;