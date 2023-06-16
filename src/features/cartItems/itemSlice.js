import { createSlice } from "@reduxjs/toolkit";

export const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState: {
    value: [],
  },
  reducers: {
    setSelectedItems: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
