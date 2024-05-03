import { createSlice } from "@reduxjs/toolkit";
import { IProjectDetails } from '~/src/a-lib';

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
    isOpenSubscribedProjects: false,
    projectDetailsPage: { isOpen: false } as IProjectDetails,
    projectIdOnEdit: -1,
    stage: 0,
    subscribedProjectsIds: [],
};

const projectsSlice = createSlice({
    name: 'projects',
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
        setSubscribedProjectsIds: (state, action) => {
            state.subscribedProjectsIds = action.payload;
        },
        setIsOpenEditProjectPage: (state, action) => {
            state.isOpenEditProjectPage = action.payload;
        },
        setIsOpenSubscribedProjects: (state, action) => {
            state.isOpenSubscribedProjects = action.payload;
        },
        setProjectDetailsPage: (state, action) => {
            state.projectDetailsPage = action.payload;
        },
        setProjectIdOnEdit: (state, action) => {
            state.projectIdOnEdit = action.payload;
        },
        setStage: (state, action) => {
            state.stage = action.payload;
        }
    },
});

export const {
    setProjectsAll,
    setShowModerated,
    setDeletedProjects,
    setIsOpenEditProjectPage,
    setIsOpenSubscribedProjects,
    setProjectDetailsPage,
    setProjectIdOnEdit,
    setStage,
    setSubscribedProjectsIds,
} = projectsSlice.actions;

export default projectsSlice.reducer;