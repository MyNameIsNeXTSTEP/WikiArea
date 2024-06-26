import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
import profileReducer from "./features/store/profile";
import projectsReducer from "./features/store/projects";
import menuReducer from "./features/store/menu";
import modulesReducer from "./features/store/projectModule";
import pagesReducer from "./features/store/analytics";
import usersReducer from "./features/store/users";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    profile: profileReducer,
    projects: projectsReducer,
    modules: modulesReducer,
    menu: menuReducer,
    pages: pagesReducer,
    users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // serializableCheck: {
        //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // },
        serializableCheck: false
      }),
  });
  
export const persistor = persistStore(store);
export default store;