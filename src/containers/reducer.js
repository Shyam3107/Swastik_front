import { combineReducers } from "redux";
import loginReducer from "./Login/reducer";
import studentReducer from "./Students/reducer";
import leaveReducer from "./Leave/reducer";
import taxReducer from "./Tax/reducer";

export default combineReducers({
  user: loginReducer,
  students: studentReducer,
  leave: leaveReducer,
  tax: taxReducer,
});
