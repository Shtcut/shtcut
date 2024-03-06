import { Card, CommonProps } from '@shtcut-ui/react';
import { Container, Logo } from '@shtcut/components';
import Head from 'next/head';
import { ReactElement, ReactNode, cloneElement } from 'react';

interface AuthLayoutProps extends CommonProps {
    content?: ReactNode;
}

const AuthLayout = ({ children, content, ...rest }: AuthLayoutProps) => {
    return (
        <div className="h-full">
            <Container className="flex flex-col flex-auto items-center justify-center min-w-0 h-full">
                <Card className="min-w-[320px] md:min-w-[450px]:" bodyClass="md:p-10">
                    <div className="text-center">
                        <Logo  />
                    </div>
                    <div>
                        {content}
                        {children
                            ? cloneElement(children as ReactElement, {
                                  contentClassName: 'text-center',
                                  ...rest
                              })
                            : null}
                    </div>
                </Card>
            </Container>
        </div>
    );
};
export default AuthLayout;
