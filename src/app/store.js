import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import queryReducer from "../features/query/querySlice";

export default configureStore({
  reducer: { counter: counterReducer, query: queryReducer },
});
