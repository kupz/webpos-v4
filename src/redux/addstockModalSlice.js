import { createSlice } from "@reduxjs/toolkit";

const addStockModalSlice = createSlice({
  name: "addStock",
  initialState: { activate: false, data: null },
  reducers: {
    activateUpdate: (state, action) => {
      state.activate = true;
      state.data = action.payload;
      return state;
    },
    deactivateUpdate: (state) => {
      state.activate = false;
      state.data = null;
      return state;
    },
  },
});

export const { activateUpdate, deactivateUpdate } = addStockModalSlice.actions;
export default addStockModalSlice.reducer;
