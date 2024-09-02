import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER } from 'redux-persist';
import appReducer from './slices';
import { AnyAction, ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import { logout } from './slices/auth';
import { api } from '@shtcut/_shared/api/app.api';
import logger from 'redux-logger';
import { appMiddleware } from '@shtcut/services/ui';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

export const persistedReducer = persistReducer(persistConfig, appReducer);

const rootReducer = (state: ReturnType<typeof persistedReducer> | undefined, action: AnyAction) => {
    if (action.type === logout.type) {
        // return persistReducer(undefined as any, action as any);
    }
    return persistedReducer(state, action);
};

const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
    configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddle) =>
            getDefaultMiddle({
                serializableCheck: {
                    ignoredActions: [FLUSH, PURGE, PAUSE, PERSIST, REGISTER]
                }
            }).concat([api.middleware, logger, appMiddleware] as any),
            // }).concat([api.middleware, appMiddleware]),
        ...options
    });

export const store = createStore();
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = ReturnType<typeof createStore>;
