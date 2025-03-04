import { qrCodeSelectors, resetState } from '@shtcut/redux/slices/qr-code';
import { resetGeneralState } from '@shtcut/redux/slices/selects';
import { useAppSelector } from '@shtcut/redux/store';
import { useDispatch } from 'react-redux';

const useQrCodeState = () => {
    const dispatch = useDispatch();
    const qrStyle = useAppSelector(qrCodeSelectors.selectQrCodeStyle);
    const logo = useAppSelector(qrCodeSelectors.selectQrCodeLogo);
    const eyeRadius = useAppSelector(qrCodeSelectors.selectEyeRadius);
    const selectedFrame = useAppSelector(qrCodeSelectors.selectSelectedFrame);
    const presetColorString = useAppSelector(qrCodeSelectors.selectPresetColor);
    const presetColor = presetColorString ? String(presetColorString) : undefined;
    const title = useAppSelector(qrCodeSelectors.selectQrCodeTitle);

    const generalReset = () => {
        dispatch(resetState());
        dispatch(resetGeneralState());
    };

    return {
        state: {
            qrStyle,
            logo,
            eyeRadius,
            selectedFrame,
            presetColor,
            title
        },
        action: {
            generalReset
        }
    };
};

export default useQrCodeState;
