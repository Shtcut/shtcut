'use client';

import * as React from 'react';
import { CommonProps, TypeAttributes } from '../../../types';
import type { ReactNode, MouseEvent } from 'react';
import { useTimeout } from '../../../hooks';
import { cn } from '../../../utils';
import StatusIcon from '../status-icon';
import '../../styles/index.css';
import CloseButton from '../close-button';

export interface NotificationProps extends CommonProps {
    closeable?: boolean;
    customIcon?: ReactNode | string;
    duration?: number;
    onClose?: (evt: MouseEvent<HTMLSpanElement>) => void;
    title?: string;
    triggerByToast?: boolean;
    type?: TypeAttributes.Status;
    width?: number | string;
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>((props, ref) => {
    const {
        className,
        children,
        closeable = false,
        customIcon,
        duration = 3000,
        onClose,
        style,
        title,
        triggerByToast,
        type,
        width = 350,
        ...rest
    } = props;

    const [display, setDisplay] = React.useState('show');

    const { clear } = useTimeout(onClose as () => void, duration, duration > 0);

    const handleClose = React.useCallback(
        (evt: MouseEvent<HTMLSpanElement>) => {
            setDisplay('hiding');
            onClose?.(evt);
            if (!triggerByToast) {
                setTimeout(() => {
                    setDisplay('hide');
                }, 400);
            }
        },
        [onClose, clear, triggerByToast],
    );

    const notificationClass = cn('notification', className);

    if (display === 'hide') {
        return null;
    }

    return (
        <div ref={ref} {...rest} className={notificationClass} style={{ width, ...style }}>
            <div className={cn('notification-content', !children && 'no-child')}>
                {type && !customIcon ? (
                    <div className="mr-3">
                        <StatusIcon type={type} />
                    </div>
                ) : null}
                {customIcon && <div className="mr-3">{customIcon}</div>}
                <div className="mr-4">
                    {title && <div className={cn('notification-title', children && 'mb-1')}>{title}</div>}
                    <div className="notification-description">{children}</div>
                </div>
            </div>
            {closeable && (
                <CloseButton
                    className="notification-close"
                    defaultStyle={false}
                    absolute={true}
                    onClick={handleClose}
                />
            )}
        </div>
    );
});

Notification.displayName = 'Notification';

export default Notification;
