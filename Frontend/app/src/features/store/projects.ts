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
    isOpenProjectsModerationPage: false,
    isOpenSubscribedProjects: false,
    projectDetailsPage: { isOpen: false } as IProjectDetails,
    projectIdOnEdit: -1,
    stage: 0,
    subscribedProjectsIds: [],
    isAddTestsOpen: false,
    refresh: false,
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
        setIsOpenProjectsModerationPage: (state, action) => {
            state.isOpenProjectsModerationPage = action.payload;
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
        },
        setChangeAddTestsOpen: (state, action) => {
            state.isAddTestsOpen = action.payload;
        },
        setRefreshProjects: (state, action) => {
            state.refresh = action.payload;
        },
    },
});

export const {
    setProjectsAll,
    setShowModerated,
    setDeletedProjects,
    setIsOpenEditProjectPage,
    setIsOpenProjectsModerationPage,
    setRefreshProjects,
    setIsOpenSubscribedProjects,
    setProjectDetailsPage,
    setProjectIdOnEdit,
    setStage,
    setSubscribedProjectsIds,
    setChangeAddTestsOpen,
} = projectsSlice.actions;

export default projectsSlice.reducer;