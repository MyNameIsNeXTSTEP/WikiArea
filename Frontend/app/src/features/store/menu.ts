import { createSlice } from '@reduxjs/toolkit';
import { TMenuButton } from '~/src/a-lib';

interface IMenuConfing {
  buttons: TMenuButton[],
  isBackBtnDisabled: boolean,
  isMainMenu: boolean,
}

const initialState: IMenuConfing = {
  buttons: [
    { id: 1, src: 'Profile', onClick: () => {} },
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
    restoreProfileMenu: (state, action) => {
      state.isMainMenu = true;
      state.isBackBtnDisabled = true;
      state.buttons = action.payload || initialState.buttons;
    },
  }
});

export const { updateButtons, changeBackBtnVisability, updateMainMenuFlag, restoreProfileMenu } = menuSlice.actions;
export default menuSlice.reducer;
