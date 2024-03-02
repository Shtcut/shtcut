import * as React from 'react';
import { CommonProps } from '../../../types';
import { CgSpinner } from 'react-icons/cg';
import { useConfig } from '../config-provider';
import { cn } from '../../../utils';

export interface SpinnerProps extends CommonProps {
  color?: string;
  enableTheme?: boolean;
  indicator?: React.ElementType;
  isLoading?: boolean;
  size?: string | number;
}

const Spinner = React.forwardRef((props: SpinnerProps, ref) => {
  const {
    className,
    color,
    enableTheme = true,
    indicator: Component = CgSpinner,
    isLoading = true,
    size = 20,
    style,
    ...rest
  } = props;

  const { themeColor, primaryColorLevel } = useConfig();

  const spinnerColor = color || (enableTheme && `${themeColor}-${primaryColorLevel}`);

  const spinnerClass = cn(isLoading && 'animate-spin', spinnerColor && `text-${spinnerColor}`, className);

  const spinnerStyle = {
    height: size,
    width: size,
    ...style,
  };

  return <Component ref={ref} style={spinnerStyle} className={spinnerClass} {...rest} />;
});

Spinner.displayName = 'Spinner';

export { Spinner };
