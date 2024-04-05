import { createSlice } from "@reduxjs/toolkit";

interface IProject {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    author: string,
    topic: string,
    deadline: string,
    complexity: number,
    isModerated: number,
};

const initialState = {
    all: [] as IProject[],
    showModerated: false,
};

const projectsSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProjectsAll: (state, action) => {
            state.all = action.payload;
        },
        setShowModerated: (state, action) => {
            state.showModerated = action.payload;
        },
    },
});

export const { setProjectsAll, setShowModerated } = projectsSlice.actions;
export default projectsSlice.reducer;