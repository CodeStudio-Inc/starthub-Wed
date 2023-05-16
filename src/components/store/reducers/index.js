import { combineReducers } from "redux";
import authReducer from "./auth";
import requestReducer from "./requests";
import adminReducer from "./admin";
import diagnosticsReducer from "./diagnostics";

export default combineReducers({
  auth: authReducer,
  requests: requestReducer,
  admin: adminReducer,
  diagnostics: diagnosticsReducer,
});
