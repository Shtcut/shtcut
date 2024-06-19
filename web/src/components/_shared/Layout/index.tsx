'use client';

import { CommonProps, cn, primitiveComponent } from '@shtcut-ui/react';

interface LayoutProps extends CommonProps, React.HTMLAttributes<HTMLDivElement> {
    fadedBelow?: boolean;
    fixedHeight?: boolean;
}

const Layout = primitiveComponent<'div', LayoutProps>((props, ref) => {
    const { className, fadedBelow = false, fixedHeight = false, ...rest } = props;
    return (
        <div
            ref={ref}
            className={cn(
                'relative flex h-full w-full flex-col',
                fadedBelow &&
                    'after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:hidden after:h-32 after:w-full after:bg-[linear-gradient(180deg,_transparent_10%,_hsl(var(--background))_70%)] after:md:block',
                fixedHeight && 'md:h-svh',
                className
            )}
            {...rest}
        />
    );
});

Layout.displayName = 'Layout';

const LayoutHeader = primitiveComponent<'div', React.HtmlHTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'flex h-[var(--header-height)] flex-none items-center gap-4 bg-background p-4 md:px-8',
                className
            )}
            {...props}
        />
    )
);

LayoutHeader.displayName = 'LayoutHeader';

interface LayoutBodyProps extends CommonProps, React.HtmlHTMLAttributes<HTMLDivElement> {
    fixedHeight?: boolean;
}

const LayoutBody = primitiveComponent<'div', LayoutBodyProps>(({ className, fixedHeight, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'bg-white flex-1 overflow-hidden px-4 py-6 md:px-8',
            fixedHeight && 'h-[calc(100%-var(--header-height))]',
            className
        )}
        {...props}
    />
));

LayoutBody.displayName = 'LayoutBody';

export { Layout, LayoutHeader, LayoutBody };
