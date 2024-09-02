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
    const { variant = 'default', icon, title, description } = props;
    return (
        <Alert variant={variant}>
            {icon}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    );
};
