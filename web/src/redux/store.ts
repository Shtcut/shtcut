import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

// export const persistedReducer = persistReducer(persistConfig,);