import { cn, primitiveComponent } from '../../../utils';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = primitiveComponent<'input', InputProps>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'h-9 w-full block appearance-none rounded-md border bg-transparent  focus:border-black focus:outline-none focus:ring-black sm:text-sm  px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    ref={ref}
    {...props}
  />
));

Input.displayName = 'Input';

export { Input };
