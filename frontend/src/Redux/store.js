import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import userslice from './userslice';


const persistConfig = {
    key: 'root',      
    storage,     
};

const persistedReducer = persistReducer(persistConfig, userslice);

const Store = configureStore({
    reducer: {
        user: persistedReducer,
    },
});

const persistor = persistStore(Store);

export { Store,persistor};