'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn, primitiveComponent } from '../../utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = primitiveComponent<typeof AccordionPrimitive.Item, typeof AccordionPrimitive.Item>(
  (props, ref) => {
    const { className } = props;
    return <AccordionPrimitive.Item ref={ref} className={cn('border-b', className)} {...props} />;
  },
);

AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = primitiveComponent<
  typeof AccordionPrimitive.AccordionTrigger,
  typeof AccordionPrimitive.Trigger
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex flex-1 item-cent justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...rest}
      >
        {children}
        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = primitiveComponent<typeof AccordionPrimitive.Content, typeof AccordionPrimitive.Content>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <AccordionPrimitive.Content
        ref={ref}
        className={cn(
          'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
          className,
        )}
      >
        <div className="pb-4 pt-0">{children}</div>
      </AccordionPrimitive.Content>
    );
  },
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
