import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/store/profile";
import projectsReducer from "./features/store/projects";

const store = configureStore({
    reducer: {
        profile: profileReducer,
        projects: projectsReducer,
    },
});

export default store;