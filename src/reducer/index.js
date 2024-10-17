import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { topicReducer } from "./topicReducer";
import { inforUserReducer } from "./inforUserReducer";

const allReducer = combineReducers({
  loginReducer,
  topicReducer,
  inforUserReducer,
  // other reducers
});

export default allReducer;
