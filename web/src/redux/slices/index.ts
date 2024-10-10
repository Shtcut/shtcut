import { combineReducers } from 'redux';

import auth from './auth';
import ui from './ui';
import { api } from '@shtcut/_shared/api/app.api';
import img from './media';
import qrCodeReducer from './qr-code';

export default combineReducers({
    [api.reducerPath]: api.reducer,
    auth,
    ui,
    img,
    qrCode: qrCodeReducer
});
