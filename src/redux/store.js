import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
// -- IMPORT REDUCERS
import eventReducer from './slices/eventSlice';

// prepare config for redux-persist
const persistConfig = {
  key: 'ireckevent',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  event: eventReducer,
});

// create persisted reducer with persist config and combined reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// create store using configureStore() from redux-toolkit
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;

// reset the store
// persistor.purge();
