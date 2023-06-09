import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import queryReducer from "../features/query/querySlice";
import siginSlicer from "../features/auth/siginSlicer";
import itemSlice from "../features/cartItems/itemSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    query: queryReducer,
    sigin: siginSlicer,
    selectedItems: itemSlice,
  },
});
