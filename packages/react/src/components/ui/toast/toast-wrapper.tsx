'use client';

import { NotificationPlacement } from '../../../types';
import { PLACEMENT } from '../../../utils/constants';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { getPlacementTransition } from './transition';
import { motion } from 'framer-motion';
import { chainedFunction, cn } from '../../../utils';
import '../../styles/_toast.css';

type NodeProps = React.DetailedReactHTMLElement<any, HTMLDivElement>;

type Message = {
    key: string;
    visible: boolean;
    node: NodeProps;
};

const useMessages = (msgKey: string) => {
    const [messages, setMessages] = React.useState<Message[]>([]);

    const getKey = React.useCallback(
        (key: string) => {
            if (typeof key === 'undefined' && messages.length) {
                key = messages[messages.length - 1].key;
            }
            return key;
        },
        [messages],
    );

    const push = React.useCallback(
        (message: NodeProps) => {
            const key = msgKey || '_' + Math.random().toString(36).substr(2, 12);
            setMessages([...messages, { key, visible: true, node: message }]);
            return key;
        },
        [messages, msgKey],
    );

    const removeAll = React.useCallback(() => {
        setMessages(messages.map((msg) => ({ ...msg, visible: false })));
        setTimeout(() => {
            setMessages([]);
        }, 50);
    }, [messages]);

    const remove = React.useCallback(
        (key: string) => {
            setMessages(
                messages.map((msg) => {
                    if (msg.key === getKey(key)) {
                        msg.visible = false;
                    }
                    return msg;
                }),
            );
            setTimeout(() => {
                setMessages(messages.filter((msg) =>  msg.visible));
            }, 50)
        },
        [messages, getKey],
    );

    return { messages, push, removeAll, remove };
};

export interface ToastProps {
    transitionType?: 'scale' | 'fade';
    placement?: NotificationPlacement | 'top-full' | 'bottom-full';
    offsetX?: string | number;
    offsetY?: string | number;
    block?: boolean;
}

export interface ToastWrapperProps extends ToastProps {
    messageKey: string;
    callback: (ref: HTMLDivElement | null) => void;
    wrapper?: HTMLElement | (() => HTMLElement);
}

export interface ToastWrapperInstance {
    root: HTMLElement;
    push: (message: React.ReactNode) => string;
    remove: (key: string) => void;
    removeAll: () => void;
}

const ToastWrapper = React.forwardRef((props: ToastWrapperProps, ref) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const {
        transitionType = 'scale',
        placement = PLACEMENT.TOP_END as NotificationPlacement,
        offsetX = 30,
        offsetY = 30,
        messageKey,
        block = false,
        callback,
        ...rest
    } = props;

    const { push, removeAll, remove, messages } = useMessages(messageKey);

    React.useImperativeHandle(ref, () => {
        return { root: rootRef.current, push, removeAll, remove };
    });

    const placementTransition = getPlacementTransition({
        offsetX,
        offsetY,
        placement: placement as NotificationPlacement,
        transitionType,
    });

    const toastProps = {
        triggerByToast: true,
        ...rest,
    };

    const messageElem = messages.map((msg) => {
        return (
            <motion.div
                key={msg.key}
                className={'toast-wrapper'}
                initial={placementTransition.variants.initial}
                variants={placementTransition.variants}
                animate={msg.visible ? 'animate' : 'exit'}
                transition={{ duration: 0.15, type: 'tween' }}
            >
                {React.cloneElement(msg.node as React.DetailedReactHTMLElement<any, HTMLElement>, {
                    ...toastProps,
                    ref,
                    onClose: chainedFunction(msg.node?.props?.onClose, () => remove(msg.key)),
                    className: cn(msg.node?.props?.className),
                })}
            </motion.div>
        );
    });
    return (
        <div
            style={placementTransition.default}
            {...rest}
            ref={(thisRef) => {
                rootRef.current = thisRef;
                callback?.(thisRef);
            }}
            className={cn('toast', block && 'w-full')}
        >
            {messageElem}
        </div>
    );
}) as any;

ToastWrapper.getInstance = (props: ToastWrapperProps) => {
    const { wrapper, ...rest } = props;
    const wrapperRef = React.createRef<ToastWrapperInstance>();

    const wrapperElem = (typeof wrapper === 'function' ? wrapper() : wrapper) || document.body;

    return new Promise((resolve) => {
        const renderCallback = () => {
            resolve([wrapperRef, unmount]);
        };

        function renderElem(elem: React.ReactNode) {
            const mountElement = document.createElement('div');
            wrapperElem.appendChild(mountElement);

            const root = ReactDOM.createRoot(mountElement);

            root.render(elem);

            return root;
        }

        const { unmount } = renderElem(<ToastWrapper {...rest} ref={wrapperRef} callback={renderCallback} />);
    });
};

ToastWrapper.displayName = 'ToastWrapper';

export default ToastWrapper;
