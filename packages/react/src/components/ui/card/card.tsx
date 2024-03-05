import * as React from 'react';
import { CommonProps } from '../../../types';
import type { ReactNode, MouseEvent } from 'react';
import { cn, primitiveComponent } from '../../../utils';
import { useConfig } from '../config-provider';
import '../../styles/index.css';

export interface CardProps extends CommonProps, Omit<React.ComponentPropsWithRef<'div'>, 'onClick'> {
    clickable?: boolean;
    bodyClass?: string;
    bordered?: boolean;
    header?: string | ReactNode;
    headerClass?: string;
    headerBorder?: boolean;
    headerExtra?: string | ReactNode;
    footer?: string | ReactNode;
    footerClass?: string;
    footerBorder?: boolean;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const Card = primitiveComponent<'div', CardProps>((props, ref) => {
    const { cardBordered } = useConfig();
    const {
        children,
        className,
        clickable = false,
        bodyClass,
        bordered = cardBordered || false,
        header,
        headerClass,
        headerBorder = true,
        headerExtra,
        footer,
        footerClass,
        footerBorder = true,
        onClick,
        ...rest
    } = props;

    const cardClass = cn(
        'card',
        className,
        bordered ? `card-border` : `card-shadow`,
        clickable && 'cursor-pointer user-select-none',
    );

    const cardBodyClass = cn('card-body', bodyClass);
    const cardHeaderClass = cn(
        'card-header',
        headerBorder && 'card-header-border',
        headerExtra && 'card-header-extra',
        headerClass,
    );

    const cardFooterClass = cn('card-footer', footerBorder && `card-footer-border`, footerClass);

    const renderHeader = () => {
        if (typeof header === 'string') {
            return <h4>{header}</h4>;
        }
        return <>{header}</>;
    };

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        onClick?.(e);
    };

    return (
        <div ref={ref} className={cardClass} role="presentation" onClick={handleClick} {...rest}>
            {header && (
                <div className={cardHeaderClass}>
                    {renderHeader()}
                    {headerExtra && <span>{headerExtra}</span>}
                </div>
            )}
            <div className={cardBodyClass}>{children}</div>
            {footer && <div className={cardFooterClass}>{footer}</div>}
        </div>
    );
});

Card.displayName = 'Card';

export default Card;
