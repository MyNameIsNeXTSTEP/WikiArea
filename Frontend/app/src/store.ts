import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profile";
import projectsReducer from "./features/projects";

const store = configureStore({
    reducer: {
        profile: profileReducer,
        projects: projectsReducer,
    },
});

export default store;