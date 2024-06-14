import { createSlice } from "@reduxjs/toolkit";
import type { IProjectModule } from "~/src/a-lib";

interface IInitialState {
    all: IProjectModule[],
    deleted: IProjectModule[],
    isOpenAddModuleBlock: boolean,
    tests: any[],
    current: number | null,
}

const initialState: IInitialState = {
    all: [],
    deleted: [],
    isOpenAddModuleBlock: false,
    tests: [],
    current: null,
};

const ModulesSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {
        setProjectModulesAll: (state, action) => {
            state.all = action.payload;
        },
        pushProjectModulesAll: (state, action) => {
            state.all.push(action.payload);
        },
        setProjectModulesDeleted: (state, action) => {
            state.deleted.push(action.payload);
        },
        setIsOpenAddModuleBlock: (state, action) => {
            state.isOpenAddModuleBlock = action.payload;
        },
        setModuleTests: (state, action) => {
            state.tests = action.payload;
        },
        setCurrentOpenModule: (state, action) => {
            state.current = action.payload;
        },
        setDeleteModule: (state, action) => {
            state.all = state.all.filter(el => el.projectId !== action.payload)
        }
    },
});

export const {
    setProjectModulesAll,
    setProjectModulesDeleted,
    setIsOpenAddModuleBlock,
    setModuleTests,
    setDeleteModule,
    pushProjectModulesAll,
    setCurrentOpenModule,
} = ModulesSlice.actions;

export default ModulesSlice.reducer;