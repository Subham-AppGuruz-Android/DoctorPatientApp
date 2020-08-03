import { combineReducers } from "redux";
import AuthReducer from "./actions/auth";
import AppReducer from "./actions/app";

export default combineReducers({
  auth: AuthReducer,
  app: AppReducer,
});
