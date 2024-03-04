'use client';

import * as React from 'react';
import { CommonProps, TypeAttributes } from '../../../types';
import type { ReactNode } from 'react';
import { HiCheckCircle, HiExclamation, HiInformationCircle, HiXCircle } from 'react-icons/hi';

export interface StatusIconProps extends CommonProps {
    type: TypeAttributes.Status;
    custom?: ReactNode | JSX.Element;
    iconColor?: string;
}

const ICONS: Record<TypeAttributes.Status, { color: string; icon: JSX.Element }> = {
    success: {
        color: 'text-emerald-400',
        icon: <HiCheckCircle />,
    },
    info: {
        color: 'text-blue-400',
        icon: <HiInformationCircle />,
    },
    warning: {
        color: 'text-yellow-400',
        icon: <HiExclamation />,
    },
    danger: {
        color: 'text-red-400',
        icon: <HiXCircle />,
    },
};

const StatusIcon = (props: StatusIconProps) => {
    const { type = 'info', custom, iconColor } = props;
    const icon = ICONS[type];

    return <span className={`text-2xl ${iconColor || icon.color}`}>{custom || icon.icon}</span>;
};

export default StatusIcon;
