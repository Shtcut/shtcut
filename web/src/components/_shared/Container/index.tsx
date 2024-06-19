import { CommonProps, cn, primitiveComponent } from '@shtcut-ui/react';
import { ElementType } from 'react';

interface ContainerProps extends CommonProps {
    asElement?: ElementType;
}

export const Container = primitiveComponent((props: ContainerProps, ref) => {
    const { className, children, asElement: Component = 'div', ...rest } = props;

    return (
        <Component ref={ref} className={cn('container mx-auto', className)} {...rest}>
            {children}
        </Component>
    );
});

Container.displayName = 'Container';
