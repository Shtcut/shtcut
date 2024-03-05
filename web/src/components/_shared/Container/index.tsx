import { CommonProps, cn } from '@shtcut-ui/react';
import { ElementType, forwardRef } from 'react';

interface ContainerProps extends CommonProps {
    asElement?: ElementType;
}

export const Container = forwardRef((props: ContainerProps, ref) => {
    const { className, children, asElement: Component = 'div', ...rest } = props;

    return <Component ref={ref} className={cn('container mx-auto')}></Component>;
});

Container.displayName = 'Container';
