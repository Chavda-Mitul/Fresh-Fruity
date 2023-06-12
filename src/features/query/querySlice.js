import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
  name: "query",
  initialState: {
    value: "",
  },
  reducers: {
    setQuery: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuery } = querySlice.actions;
export default querySlice.reducer;
