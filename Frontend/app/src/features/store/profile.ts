import { createSlice } from "@reduxjs/toolkit";

interface IProfile {
    auth: {
        accessToken: string,
        role: string,
        email: string,
        login: string,
    }
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
            state.profile.auth = action.payload;
        },
    },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;