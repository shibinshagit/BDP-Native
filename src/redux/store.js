import { configureStore  } from '@reduxjs/toolkit'
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducers'

const persistConfig = {
    key: 'app',
    storage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const  store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store);
