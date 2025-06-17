import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@shtcut/redux/store';
import { CompanyInfo, ContactInfo } from '@shtcut/types/types';

type GeneralState = {
    title: string;
    description: string;
    image: { id: string; preview: string };
    url: string;
    step: number;
    template: string;
    bgColor: string;
    presetColor: string;
    btnColor: string;
    selectedTab: number;
    borderColor: string;
    socialLinks: { [key: string]: string };
    file: { id: string; file: File } | null;
    contactInfo: ContactInfo;
    company: CompanyInfo;
};

type UpdateFieldPayload = {
    key: keyof ContactInfo | keyof CompanyInfo;
    value: string;
};

const initialState: GeneralState = {
    title: '',
    description: '',
    image: { id: '', preview: '' },
    url: '',
    step: 1,
    template: 'template_1',
    bgColor: '#ffffff',
    presetColor: '#0D2C7A',
    btnColor: '#ffffff',
    selectedTab: 0,
    borderColor: '#000',
    socialLinks: {},
    file: null,
    contactInfo: {
        phoneNumber: '',
        email: '',
        websiteUrl: '',
        streetAddress: '',
        country: '',
        state: '',
        zipCode: '',
        city: ''
    },
    company: {
        name: '',
        department: ''
    }
};

const generalSelectSlice = createSlice({
    name: 'select',
    initialState,
    reducers: {
        resetGeneralState: (state) => {
            return initialState;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setImage: (state, action: PayloadAction<{ id: string; preview: string }>) => {
            state.image = action.payload;
        },
        setUrl: (state, action: PayloadAction<string>) => {
            state.url = action.payload;
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        nextStep: (state) => {
            state.step += 1;
        },
        prevStep: (state) => {
            state.step = Math.max(state.step - 1, 1);
        },
        setSelectedTemplate: (state, action: PayloadAction<string>) => {
            state.template = action.payload;
        },
        setBgColor: (state, action: PayloadAction<string>) => {
            state.bgColor = action.payload;
        },
        setPresetColor: (state, action: PayloadAction<string>) => {
            state.presetColor = action.payload;
        },
        setBtnColor: (state, action: PayloadAction<string>) => {
            state.btnColor = action.payload;
        },
        setSelectedTab: (state, action: PayloadAction<number>) => {
            state.selectedTab = action.payload;
        },
        setBorderColor: (state, action: PayloadAction<string>) => {
            state.borderColor = action.payload;
        },
        setSocialLinks: (state, action: PayloadAction<{ [key: string]: string }>) => {
            state.socialLinks = action.payload;
        },
        updateSocialLink: (state, action: PayloadAction<{ platform: string; url: string }>) => {
            const { platform, url } = action.payload;
            state.socialLinks[platform] = url;
        },
        setContactInfo: (state, action: PayloadAction<ContactInfo>) => {
            state.contactInfo = action.payload;
        },
        updateContactField(state, action: PayloadAction<UpdateFieldPayload>) {
            const { key, value } = action.payload;
            if (state.contactInfo) {
                state.contactInfo[key] = value;
            }
        },
        setCompany: (state, action: PayloadAction<CompanyInfo>) => {
            state.company = action.payload;
        },
        setFile: (state, action: PayloadAction<{ id: string; file: File } | null>) => {
            state.file = action.payload;
        },

        updateCompanyField(state, action: PayloadAction<UpdateFieldPayload>) {
            const { key, value } = action.payload;
            if (state.company) {
                state.company[key] = value;
            }
        }
    }
});

export const {
    setTitle,
    setDescription,
    setStep,
    nextStep,
    prevStep,
    resetGeneralState,
    setImage,
    setSelectedTemplate,
    setBgColor,
    setPresetColor,
    setBtnColor,
    setSelectedTab,
    setBorderColor,
    setSocialLinks,
    updateSocialLink,
    setContactInfo,
    updateContactField,
    setCompany,
    updateCompanyField,
    setFile,
    setUrl
} = generalSelectSlice.actions;

export default generalSelectSlice.reducer;
const createSelector =
    <T>(key: keyof GeneralState) =>
    (state: RootState): T => {
        return state.generalStateReduce[key] as T;
    };

export const generalStateSelectors = {
    selectTitle: createSelector('title'),
    setDescription: createSelector('description'),
    selectStep: createSelector('step'),
    selectImage: createSelector<{ id: string; preview: string }>('image'),
    selectUrl: createSelector('url'),
    selectSelectedTemplate: createSelector('template'),
    selectBgColor: createSelector('bgColor'),
    selectPresetColor: createSelector<string>('presetColor'),
    selectBtnColor: createSelector<string>('btnColor'),
    setSelectedTab: createSelector<number>('selectedTab'),
    setBorderColor: createSelector<string>('borderColor'),
    selectSocialLinks: createSelector('socialLinks'),
    selectContactInfo: createSelector('contactInfo'),
    selectCompany: createSelector('company'),
    selectFile: createSelector<(File & { id?: string }) | null>('file')
};
