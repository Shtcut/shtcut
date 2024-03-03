'use client';

import { NotificationPlacement } from '@/types';
import { PLACEMENT } from '@/utils/constants';
import * as React from 'react';
import { getPlacementTransition } from './transition';

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
        },
        [messages, getKey],
    );

    return { messages, push, removeAll, remove };
};

export interface ToastProps {
    transitionType?: 'scale' | 'fade';
    placement?: NotificationPlacement | 'top-fill' | 'bottom-full';
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
    const rootRef = React.useRef<HTMLDivElement>(null);
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
    return <div></div>;
});
