import { createSlice } from '@reduxjs/toolkit';

interface IMenuConfing {
  buttons: Array<{
    props?: Record<string, string | number | boolean>,
    src?: string,
    onClick?: () => void,
    id: number,
  }>,
  isBackBtnDisabled: boolean,
  isMainMenu: boolean,
}

const initialState: IMenuConfing = {
  buttons: [
    { id: 1, src: 'Profile' },
  ],
  isBackBtnDisabled: true,
  isMainMenu: true,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeBackBtnVisability: (state, action) => {
      state.isBackBtnDisabled = action.payload;
    },
    updateButtons: (state, action) => {
      state.buttons = action.payload;
    },
    updateMainMenuFlag: (state, action) => {
      state.isMainMenu = action.payload;
    },
    restoreProfileMenu: (state) => {
      state.isMainMenu = true;
      state.buttons = initialState.buttons;
      state.isBackBtnDisabled = true;
    }
  }
});

export const { updateButtons, changeBackBtnVisability, updateMainMenuFlag, restoreProfileMenu } = menuSlice.actions;
export default menuSlice.reducer;
