import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    analytics: {
        stage: 0,
        isShowPopularityAnalytics: false,
        isShowSuccessAnalytics: false,
    },
};

const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        setIsShowPopularityAnalytics: (state, action) => {
            state.analytics.isShowPopularityAnalytics = action.payload;
        },
        setIsShowSuccessAnalytics: (state, action) => {
            state.analytics.isShowSuccessAnalytics = action.payload;
        },
        setStage: (state, action) => {
            state.analytics.stage = action.payload;
        }
    },
});

export const {
    setIsShowPopularityAnalytics,
    setIsShowSuccessAnalytics,
    setStage,
} = pagesSlice.actions;

export default pagesSlice.reducer;