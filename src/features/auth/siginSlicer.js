import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const signout = createAsyncThunk(
  "sigin/signout",
  async (_, { dispatch }) => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      dispatch(siginSlice.actions.signoutSuccess());
      console.log("sign out successful");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const siginSlice = createSlice({
  name: "sigin",
  initialState: {
    value: null,
  },
  reducers: {
    signin: (state) => {
      state.value = true;
      console.log("sign in");
    },
    signoutSuccess: (state) => {
      state.value = false;
    },
  },
});

export const { signin } = siginSlice.actions;
export default siginSlice.reducer;
