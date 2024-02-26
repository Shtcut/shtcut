import { Alert, AlertDescription, AlertTitle } from '@shtcut-ui/react';
import { ReactElement } from 'react';

type AppAlertProps = {
    variant?: 'destructive' | 'default';
    className?: string;
    title?: string;
    icon?: ReactElement;
    description?: string;
};
export const AppAlert = (props: AppAlertProps) => {
    const { className, variant = 'default', icon, title, description } = props;
    return (
        <Alert variant={variant} className={className}>
            {icon}
            {title && <AlertTitle>{title}</AlertTitle>}
            {description && <AlertDescription>{description}</AlertDescription>}
        </Alert>
    );
};
