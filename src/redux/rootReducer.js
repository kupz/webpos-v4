import { combineReducers } from "@reduxjs/toolkit";

import updateModalReducer from "./updateModalSlice";
import addstockModalReducer from "./addstockModalSlice";

const rootReducer = combineReducers({
  updateModal: updateModalReducer,
  addstockModal: addstockModalReducer,
  //   other: otherReducer,
});

export default rootReducer;
