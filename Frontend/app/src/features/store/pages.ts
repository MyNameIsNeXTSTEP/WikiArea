import { createSlice } from "@reduxjs/toolkit";

export interface IPageStagesData {
    page: string,
    stage: number,
};

const initialState = {
    page: '/',
    stage: 0,
};

const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        setPageStagesData: (state, action) => {
            const { page, stage } = action.payload as IPageStagesData;
            state.page = page;
            state.stage = stage;
        },
    },
});

export const { setPageStagesData } = pagesSlice.actions;
export default pagesSlice.reducer;