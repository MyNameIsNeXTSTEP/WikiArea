import { createSlice } from "@reduxjs/toolkit";

export interface IProfileAuthData {
    role: string,
    email: string,
    login: string,
};

const initialState = {
    users: [] as IProfileAuthData[],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersData: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { setUsersData } = usersSlice.actions;
export default usersSlice.reducer;