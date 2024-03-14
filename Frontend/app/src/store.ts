import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profile";

const store = configureStore({
    reducer: {
        profile: profileReducer,
    },
});

export default store;