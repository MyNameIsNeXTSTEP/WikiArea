import { createSlice } from "@reduxjs/toolkit";

interface IProjectModule {
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

interface IInitialState {
    all: IProjectModule[],
    deleted: IProjectModule[],
    isOpenAddModuleBlock: boolean,
    tests: any[],
}

const initialState: IInitialState = {
    all: [],
    deleted: [],
    isOpenAddModuleBlock: false,
    tests: [],
};

const ModulesSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjectModulesAll: (state, action) => {
            state.all.push(action.payload);
        },
        setProjectModulesDeleted: (state, action) => {
            state.deleted.push(action.payload);
        },
        setIsOpenAddModuleBlock: (state, action) => {
            state.isOpenAddModuleBlock = action.payload;
        },
        setModuleTests: (state, action) => {
            state.tests.push(action.payload);
        },
    },
});

export const {
    setProjectModulesAll,
    setProjectModulesDeleted,
    setIsOpenAddModuleBlock,
    setModuleTests,
} = ModulesSlice.actions;

export default ModulesSlice.reducer;