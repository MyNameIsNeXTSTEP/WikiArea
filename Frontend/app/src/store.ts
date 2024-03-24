import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/store/profile";
import projectsReducer from "./features/store/projects";
import menuReducer from "./features/store/menu";

const store = configureStore({
    reducer: {
        profile: profileReducer,
        projects: projectsReducer,
        menu: menuReducer,
    },
});

export default store;