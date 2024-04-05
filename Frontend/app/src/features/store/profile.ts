import { createSlice } from "@reduxjs/toolkit";

export interface IProfileAuthData {
    accessToken: string,
    role: string,
    email: string,
    login: string,
};

const initialState = {
    auth: {},
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileData: (state, action) => {
            // @ts-ignore
            state.auth = action.payload as IProfileAuthData;
        },
    },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;