import { PURGE } from "redux-persist";
import { createSlice } from "@reduxjs/toolkit";

export interface IProfileAuthData {
    accessToken?: string,
    role?: string,
    email?: string,
    login?: string,
};

const initialState: { auth: IProfileAuthData} = {
    auth: {},
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileData: (state, action) => {
            state.auth = action.payload as IProfileAuthData;
        },
        logout: (state) => {
            state.auth = initialState.auth;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            state.auth = initialState.auth;
        });
    }
});

export const { setProfileData, logout } = profileSlice.actions;
export default profileSlice.reducer;