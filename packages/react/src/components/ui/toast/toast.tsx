import { PLACEMENT } from '../../../utils';
import type { ReactNode } from 'react';
import ToastWrapper, { ToastProps } from './toast-wrapper';
import { NotificationPlacement } from '../../../types';
import '../../styles/index.css';

export const toastDefaultProps = {
    placement: PLACEMENT.TOP_END,
    offsetX: 30,
    offsetY: 30,
    transitionType: 'scale',
    block: false,
};

export interface Toast {
    push(msg: ReactNode, options?: ToastProps): string | undefined | Promise<string | undefined>;
    remove(key: string): void;
    removeAll(): void;
}

const defaultWrapperId = 'default';
const wrappers = new Map();

function castPlacement(placement: NotificationPlacement) {
    if (/\top\b/.test(placement)) {
        return 'top-full';
    }

    if (/\bottom\b/.test(placement)) {
        return 'bottom-full';
    }
}

async function createWrapper(wrapperId: string, props: ToastProps) {
    const [wrapper] = await ToastWrapper.getInstance(props);
    wrappers.set(wrapperId || defaultWrapperId, wrapper);

    return wrapper;
}

function getWrapper(wrapperId?: string) {
    if (wrappers.size === 0) {
        return null;
    }
    return wrappers.get(wrapperId || defaultWrapperId);
}

const toast: Toast = (message: ReactNode) => toast.push(message);

toast.push = (message, options = toastDefaultProps as ToastProps) => {
    let id = options.placement;
    if (options.block) {
        id = castPlacement(options.placement as NotificationPlacement);
    }

    const wrapper = getWrapper(id);

    if (wrapper?.current) {
        return wrapper.current.push(message);
    }

    return createWrapper(id ?? '', options).then((ref) => {
        return ref.current?.push(message);
    });
};

toast.remove = (key) => {
    wrappers.forEach((w) => w.current.remove(key));
};
toast.removeAll = () => {
    wrappers.forEach((w) => w.current.removeAll());
};

export default toast;
