import { combineReducers } from "redux";

// auth
import authReducer from "./auth/login";
// question
import questionReducer from "./question/questionOps";
export default combineReducers({
  //auth
  authReducer,
  questionReducer,
});
