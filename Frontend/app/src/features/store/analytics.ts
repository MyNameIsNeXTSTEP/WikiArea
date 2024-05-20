import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    analytics: {
        type: ['techer', 'admin'],
        stage: 0,
        isShowPopularityAnalytics: false,
        isShowSuccessAnalytics: false,
        popular: [],
        successful: [],
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
        },
        setPopularAnalytics: (state, action) => {
            state.analytics.popular = action.payload;
        },
        setSuccessfulAnalytics: (state, action) => {
            state.analytics.successful = action.payload;
        }
    },
});

export const {
    setIsShowPopularityAnalytics,
    setIsShowSuccessAnalytics,
    setStage,
    setPopularAnalytics,
    setSuccessfulAnalytics,
} = pagesSlice.actions;

export default pagesSlice.reducer;