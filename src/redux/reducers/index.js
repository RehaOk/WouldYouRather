import { combineReducers } from "redux";

// auth
import authReducer from "./auth/login";
// question
import questionReducer from "./question/questionOps";
// user
import userReducer from "./user/userOps";

export default combineReducers({
  //auth
  authReducer,
  questionReducer,
  userReducer,
});
