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
    deleted: [] as IProject[],
    isOpenEditProjectPage: false,
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
        setDeletedProjects: (state, action) => {
            state.deleted = action.payload;
        },
        setIsOpenEditProjectPage: (state, action) => {
            state.isOpenEditProjectPage = action.payload;
        }
    },
});

export const { setProjectsAll, setShowModerated, setDeletedProjects, setIsOpenEditProjectPage } = projectsSlice.actions;
export default projectsSlice.reducer;