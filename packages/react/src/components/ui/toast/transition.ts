import { NotificationPlacement } from '../../../types';

type GetPlacementTransitionParams = {
    offsetX: string | number;
    offsetY: string | number;
    placement: NotificationPlacement;
    transitionType: 'scale' | 'fade';
};

type Motion = {
    opacity: number;
    transform?: string;
};

type MotionProps = {
    initial: Motion;
    animate: Motion;
    exit: Motion;
};

type MotionDefault = {
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
    transform?: string;
};

type MotionTransition = {
    default: MotionDefault;
    variants: MotionProps;
};

export const getPlacementTransition = ({
    offsetX,
    offsetY,
    placement,
    transitionType,
}: GetPlacementTransitionParams) => {
    if (transitionType === 'fade') {
        return fadeTransition(offsetX, offsetY)[placement];
    }
    return scaleTransition(offsetX, offsetY)[placement];
};

const scaleMotionProps: MotionProps = {
    initial: {
        opacity: 0,
        transform: 'scale(0.75)',
    },
    animate: {
        transform: 'scale(1)',
        opacity: 1,
    },
    exit: {
        opacity: 0,
        transform: 'scale(0.75)',
    },
};

const fadeMotionProps: MotionProps = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

const scaleTransition = (
    offsetX: number | string,
    offsetY: number | string,
): Record<NotificationPlacement, MotionTransition> => {
    return {
        'top-end': {
            default: {
                top: offsetY,
                right: offsetX,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'top-start': {
            default: {
                top: offsetY,
                left: offsetX,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'top-center': {
            default: {
                top: offsetY,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'bottom-end': {
            default: {
                bottom: offsetY,
                right: offsetX,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'bottom-start': {
            default: {
                bottom: offsetY,
                left: offsetX,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'bottom-center': {
            default: {
                bottom: offsetY,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...scaleMotionProps,
            },
        },
    };
};

const fadeTransition = (
    offsetX: number | string,
    offsetY: number | string,
): Record<NotificationPlacement, MotionTransition> => {
    return {
        'top-end': {
            default: {
                top: offsetY,
                right: offsetX,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'top-start': {
            default: {
                top: offsetY,
                left: offsetX,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'top-center': {
            default: {
                top: offsetY,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'bottom-end': {
            default: {
                bottom: offsetY,
                right: offsetX,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'bottom-start': {
            default: {
                bottom: offsetY,
                left: offsetX,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'bottom-center': {
            default: {
                bottom: offsetY,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...fadeMotionProps,
            },
        },
    };
};
