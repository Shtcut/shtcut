'use client';

import { LayoutBody } from '@shtcut/components';
import QRCodeCreateContainer from '@shtcut/containers/url-shorten-er/qr-code/qr-code-create';

const CreateQRCode = () => {
    return (
        <LayoutBody className="">
            <QRCodeCreateContainer />
        </LayoutBody>
    );
};

export default CreateQRCode;
