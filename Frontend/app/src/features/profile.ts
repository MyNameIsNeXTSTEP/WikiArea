import { createSlice } from "@reduxjs/toolkit";

interface IProfile {
    id: number
};

const initialState = {
    profileData: [],
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getProfileData: (state, action) => {
            // @ts-ignore
            state.profileData.push({ id: Date.now(), text: action.payload });
        },
        deleteProfile: (state, action) => {
            state.profileData = state.profileData.filter((profile: IProfile) => profile.id !== action.payload);
        },
    },
});

export const { getProfileData, deleteProfile } = profileSlice.actions;

export default profileSlice.reducer;