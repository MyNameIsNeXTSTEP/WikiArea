import { createSlice } from "@reduxjs/toolkit";

interface IMenu {
    id: number
};

const initialState = {
    menuConfig: [],
};

const MenuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        getProfileData: (state, action) => {
            // @ts-ignore
            state.menu.push({ id: Date.now(), text: action.payload });
        },
        deleteProfile: (state, action) => {
            state.menu = state.menu.filter((menu: IMenu) => menu.id !== action.payload);
        },
    },
});

export const { getProfileData, deleteProfile } = MenuSlice.actions;
export default MenuSlice.reducer;