import { createSlice } from '@reduxjs/toolkit';

interface IMenuConfing {
  buttons: Array<{
    props?: Record<string, string | number | boolean>,
    label?: string,
    id?: number,
    onClick?: () => void,
  }>,
  isBackBtnDisabled: boolean,
  isMainMenu: boolean,
}

const initialState: IMenuConfing = {
  buttons: [
    // { id: 1, label: 'Profile', onClick: () => {} },
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
  }
});

export const { updateButtons, changeBackBtnVisability, updateMainMenuFlag } = menuSlice.actions;
export default menuSlice.reducer;
