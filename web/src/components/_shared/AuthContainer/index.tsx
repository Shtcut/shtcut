import { ReactNode } from 'react';
import { Card, CommonProps } from '@shtcut-ui/react';
import { Container } from '../Container';

interface AuthContainerProps extends CommonProps {
    content?: ReactNode;
}

export const AuthContainer = (props: AuthContainerProps) => {
    const { children, content, ...rest } = props;

    return (
        <div className='h-full'>
            <Container className='flex flex-col flex-auto items-center justify-center min-w-0 h-full'>
                <Card className='min-w-[320px] md:min-w-[450px] md'>
                </Card>
            </Container>
        </div>
    )
}
