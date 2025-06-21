// hooks/useInitializeQrCodeForm.ts
import { useEffect } from 'react';
import { useAppDispatch } from '@shtcut/redux/store';
import {
    setBgColor,
    setBorderColor,
    setBtnColor,
    setCompany,
    setContactInfo,
    setDescription,
    setFile,
    setImage,
    setPresetColor,
    setSelectedTemplate,
    setTitle,
    setUrl
} from '@shtcut/redux/slices/selects';
import {
    selectQrCodeStyle,
    setEyeRadius,
    setQrCodeLogo,
    setQrCodePresetColor,
    setQrTitle,
    setSelectedFrame
} from '@shtcut/redux/slices/qr-code';
import { UseFormSetValue } from 'react-hook-form';

export const useInitializeQrCodeForm = ({
    editId,
    getQrCodeData,
    setValue
}: {
    editId: string | undefined;
    getQrCodeData: any;
    setValue: UseFormSetValue<{ url: string }>;
}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (editId && getQrCodeData) {
            const addressData = getQrCodeData.address || {};
            const companyData = getQrCodeData.company || {};
            const contactData = getQrCodeData.contacts || {};

            dispatch(
                setContactInfo({
                    phoneNumber: contactData.phone || '',
                    email: contactData.email || '',
                    websiteUrl: contactData.website || '',
                    streetAddress: addressData.street || '',
                    country: addressData.country || '',
                    state: addressData.state || '',
                    zipCode: addressData.zipCode || '',
                    city: addressData.city || ''
                })
            );

            dispatch(
                setCompany({
                    name: companyData.name || '',
                    department: companyData.department || ''
                })
            );

            dispatch(setQrTitle(getQrCodeData?.qrCode?.name || getQrCodeData?.title));
            dispatch(setTitle(getQrCodeData?.title));
            dispatch(setBgColor(getQrCodeData?.bgColor));
            dispatch(setBorderColor(getQrCodeData?.borderColor || getQrCodeData?.qrCode?.colors?.borderColor));
            dispatch(setDescription(getQrCodeData?.description));
            dispatch(setBtnColor(getQrCodeData?.template?.btnColor));
            dispatch(
                setPresetColor(getQrCodeData?.qrCode?.colors?.presetColor || getQrCodeData?.template?.presetColor)
            );
            dispatch(
                setQrCodePresetColor(
                    getQrCodeData?.qrCode?.colors?.presetColor || getQrCodeData?.template?.presetColor || ''
                )
            );
            dispatch(setQrCodeLogo(getQrCodeData?.qrCode?.logo ?? ''));
            dispatch(setSelectedTemplate(getQrCodeData?.template?.template));
            dispatch(setEyeRadius(getQrCodeData?.qrCode?.eyeRadius));
            dispatch(setSelectedFrame(getQrCodeData?.qrCode?.frame));
            dispatch(selectQrCodeStyle(getQrCodeData?.qrCode?.qrStyle));
            setValue('url', getQrCodeData?.url);

            dispatch(
                setImage({
                    id: getQrCodeData?.profileImage?.id,
                    preview: getQrCodeData?.profileImage?.file?.url
                })
            );

            dispatch(setFile({ id: getQrCodeData?.file?.id, file: getQrCodeData?.file?.file }));
        }
    }, [editId, getQrCodeData, dispatch, setValue, getQrCodeData?.url]);
};
