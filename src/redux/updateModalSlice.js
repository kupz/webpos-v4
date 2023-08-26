import { createSlice } from "@reduxjs/toolkit";

const updateModalSlice = createSlice({
  name: "updateModal",
  initialState: { activate: false, data: null },
  reducers: {
    activate: (state, action) => {
      state.activate = true;
      state.data = action.payload;
      return state;
    },
    deactivate: (state) => {
      state.activate = false;
      state.data = null;
      return state;
    },
  },
});

export const { activate, deactivate } = updateModalSlice.actions;
export default updateModalSlice.reducer;
