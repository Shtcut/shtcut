import * as Tooltip from '@radix-ui/react-tooltip';
import { CommonProps } from '@shtcut-ui/react';
import { ReactNode } from 'react';

interface TooltipWrapperProps extends CommonProps {
    title: string;
    component: ReactNode;
}

export const TooltipWrapper = ({ component, title }: TooltipWrapperProps) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root delayDuration={2}>
                <Tooltip.Trigger>{component}</Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade 
                    data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade 
                    data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade 
                    data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade
                    shadow-md select-none rounded-[4px] bg-slate-900 text-white px-[15px] py-[10px] text-[12px] leading-none will-change-[transform,opacity]"
                        sideOffset={11}
                    >
                        {title}
                    </Tooltip.Content>
                    <Tooltip.Arrow className="fill-slate-900" />
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};
