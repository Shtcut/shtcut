// store/qrCodeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@shtcut/redux/store';
import { EyeRadiusType, QrCodeShape } from '@shtcut/types/types';

interface QrCodeState {
    selectedColor: string | null;
    btnColor: string;
    bgColor: string;
    qrCodeName: string;
    qrCodeLogo?: string;
    selectedFrame: number;
    qrCodeShape: QrCodeShape;
    // eyeRadius: EyeRadiusType;
}

const initialState: QrCodeState = {
    selectedColor: '#000000',
    btnColor: '#000000',
    bgColor: '#000000',
    qrCodeName: '',
    qrCodeLogo: undefined,
    selectedFrame: 1,
    qrCodeShape: 'squares'
    // eyeRadius: [{ outer: 8, inner: 4 }]
};

const qrCodeSlice = createSlice({
    name: 'qrCode',
    initialState,
    reducers: {
        setSelectedColor: (state, action: PayloadAction<string>) => {
            state.selectedColor = action.payload;
        },
        setBtnColor: (state, action: PayloadAction<string>) => {
            state.btnColor = action.payload;
        },
        setBgColor: (state, action: PayloadAction<string>) => {
            state.bgColor = action.payload;
        },
        setQrCodeName: (state, action: PayloadAction<string>) => {
            state.qrCodeName = action.payload;
        },
        setQrCodeLogo: (state, action: PayloadAction<string | undefined>) => {
            state.qrCodeLogo = action.payload;
        },
        setSelectedFrame: (state, action: PayloadAction<number>) => {
            state.selectedFrame = action.payload;
        },
        setQrCodeShape: (state, action: PayloadAction<QrCodeShape>) => {
            state.qrCodeShape = action.payload;
        }
        // setEyeRadius: (state, action: PayloadAction<EyeRadiusType>) => {
        //     state.eyeRadius = action.payload;
        // }
    }
});

export const {
    setSelectedColor,
    setBtnColor,
    setBgColor,
    setQrCodeName,
    setQrCodeLogo,
    setSelectedFrame,
    setQrCodeShape
    // setEyeRadius
} = qrCodeSlice.actions;

export default qrCodeSlice.reducer;
const createSelector =
    <T>(key: keyof QrCodeState) =>
    (state: RootState) =>
        state.qrCode[key];

export const qrCodeSelectors = {
    selectSelectedColor: createSelector('selectedColor'),
    selectBtnColor: createSelector('btnColor'),
    selectBgColor: createSelector('bgColor'),
    selectQrCodeName: createSelector('qrCodeName'),
    selectQrCodeLogo: createSelector('qrCodeLogo'),
    selectSelectedFrame: createSelector('selectedFrame'),
    selectQrCodeShape: createSelector('qrCodeShape')
    // selectEyeRadius: createSelector('eyeRadius')
};
