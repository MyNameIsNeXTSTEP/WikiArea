import { createSlice } from "@reduxjs/toolkit";

interface IProject {
    id: number
};

const initialState = {
    projectsData: [],
};

const projectsSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProjectsData: (state, action) => {
            // @ts-ignore
            state.projectsData.push(action.payload as IProject);
        },
        getProjectsData: (state, action) => {
            state.projectsData;
        },
    },
});

export const { setProjectsData, getProjectsData } = projectsSlice.actions;
export default projectsSlice.reducer;