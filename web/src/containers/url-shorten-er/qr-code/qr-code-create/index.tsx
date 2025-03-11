import QRCodeCreateComponent from '@shtcut/components/ui/qr-code-components/qr-code-create';
import { useQrCode } from '@shtcut/hooks/qr-code';
import useExtractId from '@shtcut/hooks/useExtractId';
import React, { useState } from 'react';

const QRCodeCreateContainer = () => {
    const [saveModal, setSaveModal] = useState(false);
    const id = useExtractId();
    const { qrState } = useQrCode({ call: true, id });

    return (
        <QRCodeCreateComponent
            saveModal={saveModal}
            setSaveModal={setSaveModal}
            getQrCodeData={qrState.getSingleQrCode}
            editId={id}
            isLoadingGetQrCode={qrState?.getQrCodeIsLoading}
        />
    );
};

export default QRCodeCreateContainer;
