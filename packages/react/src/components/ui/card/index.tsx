// import Card from './card';

// export type { CardProps } from './card';
// export { Card };

// export default Card;

import { cn, primitiveComponent } from '../../../utils';
import * as React from 'react';

const Card = primitiveComponent<'div', React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-xl border bg-card text-card-foreground shadow', className)} {...props} />
));

Card.displayName = 'Card';

const CardHeader = primitiveComponent<'div', React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

const CardTitle = primitiveComponent<'p', React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
));

CardTitle.displayName = 'CardTitle';

const CardDescription = primitiveComponent<'p', React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
    ),
);

CardDescription.displayName = 'CardDescription';

const CardContent = primitiveComponent<'div', React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));

CardContent.displayName = 'CardContent';

const CardFooter = primitiveComponent<'div', React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
