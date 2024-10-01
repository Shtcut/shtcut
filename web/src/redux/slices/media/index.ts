import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@shtcut/redux/store';

interface PhotoState {
    selectedPhoto: UnsplashPhoto | null;
}

const initialState: PhotoState = {
    selectedPhoto: null
};

const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        setSelectedPhoto: (state, action: PayloadAction<UnsplashPhoto>) => {
            state.selectedPhoto = action.payload;
        },
        clearSelectedPhoto: (state) => {
            state.selectedPhoto = null;
        }
    }
});

export const { setSelectedPhoto, clearSelectedPhoto } = photoSlice.actions;

export default photoSlice.reducer;

export const selectApartment = (state: RootState) => state.img.selectedPhoto;
