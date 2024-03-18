'use client';

import { Button } from '@shtcut-ui/react';
import { LayoutBody } from '@shtcut/components';

const QrCode = () => {
    return (
        <LayoutBody className="space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-light md:text-3xl">QrCode</h1>
                <div className="flex items-center space-x-2">
                    <Button>QrCode</Button>
                </div>
            </div>
        </LayoutBody>
    );
};

export default QrCode;
