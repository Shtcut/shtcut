'use client';

import * as React from 'react';
import type { MouseEvent } from 'react';
import { CommonProps } from '../../../types';
import { cn } from '../../../utils';
import { HiX } from 'react-icons/hi';
import '../../styles/_close-button.css';

export interface CloseButtonProps extends CommonProps {
    absolute?: boolean;
    defaultStyle?: boolean;
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}

const CloseButton = React.forwardRef<HTMLElement, CloseButtonProps>((props, ref) => {
    const { absolute, className, defaultStyle, ...rest } = props;
    const closeButtonAbsoluteClass = 'absolute z-10';

    const closeButtonClass = cn(
        'close-btn',
        defaultStyle && 'close-btn-default' && absolute && closeButtonAbsoluteClass,
        className,
    );
    return (
        <span className={closeButtonClass} role="button" {...rest} ref={ref}>
            <HiX />
        </span>
    );
});

CloseButton.displayName = 'CloseButton';

export default CloseButton;
