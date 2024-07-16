import QRCodeCreateComponent from '@shtcut/components/ui/qr-code/qr-code-create';
import { EyeRadiusType, QrCodeShape } from '@shtcut/types/types';
import React, { useState } from 'react';

const QRCodeCreateContainer = () => {
    const [saveModal, setSaveModal] = useState(false);
    const [step, setStep] = useState<number>(1);
    const [selectedColor, setSelectedColor] = useState<string>('#000000');
    const [btnColor, setBtnColor] = useState<string>('#000000');
    const [bgColor, setBgColor] = useState<string>('#000000');
    const [qrCodeName, setQrCodeName] = useState<string>('');
    const [qrCodeLogo, setQrCodeLogo] = useState<string | undefined>('');
    const [selectedFrame, setSelectedFrame] = useState(1);
    const [qrCodeShape, setQrCodeShape] = useState<QrCodeShape>('squares');
    const [eyeRadius, setEyeRadius] = useState<EyeRadiusType>([
        { outer: 8, inner: 4 },
        { outer: 8, inner: 4 },
        { outer: 8, inner: 4 }
    ]);
    const handleEyeRadiusChange = (outer: number, inner: number) => {
        setEyeRadius([
            { outer, inner },
            { outer, inner },
            { outer, inner }
        ]);
    };

    const handleColorClick = (colorValue: string) => {
        setSelectedColor(colorValue);
    };
    const handleChangeQrCodeShape = (shape: QrCodeShape) => {
        setQrCodeShape(shape);
    };
    const onNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const onPrevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleInputChange = (event) => {
        setQrCodeName(event.target.value);
    };

    const handleSelectQrCodeLogo = (logo: string | undefined) => {
        setQrCodeLogo(logo);
    };

    return (
        <QRCodeCreateComponent
            onPrevStep={onPrevStep}
            onNextStep={onNextStep}
            step={step}
            setStep={setStep}
            btnColor={btnColor}
            bgColor={bgColor}
            handleColorClick={handleColorClick}
            setBgColor={setBgColor}
            selectedColor={selectedColor}
            setBtnColor={setBtnColor}
            qrCodeName={qrCodeName}
            setQrCodeName={setQrCodeName}
            handleInputChange={handleInputChange}
            setSelectedFrame={setSelectedFrame}
            selectedFrame={selectedFrame}
            handleSelectQrCodeLogo={handleSelectQrCodeLogo}
            qrCodeLogo={qrCodeLogo}
            handleChangeQrCodeShape={handleChangeQrCodeShape}
            qrCodeShape={qrCodeShape}
            eyeRadius={eyeRadius}
            handleEyeRadiusChange={handleEyeRadiusChange}
            saveModal={saveModal}
            setSaveModal={setSaveModal}
        />
    );
};

export default QRCodeCreateContainer;
