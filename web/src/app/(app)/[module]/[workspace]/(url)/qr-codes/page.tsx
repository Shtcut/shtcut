'use client';

import { LayoutBody } from '@shtcut/components';
import { QrCodeContainer } from '@shtcut/containers/qr-code';
import { useState } from 'react';

const QrCode = () => {
    const [isRemoveLogo, setIsRemoveLogo] = useState(false);

    return (
        <LayoutBody className="container">
            <QrCodeContainer />
        </LayoutBody>
    );
};

export default QrCode;
