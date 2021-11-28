import { combineReducers } from "redux";
import loginReducer from "./Login/reducer";
import taxReducer from "./Tax/reducer";
import tripsReducer from "./Trips/reducer";

export default combineReducers({
  user: loginReducer,
  tax: taxReducer,
  trips: tripsReducer,
});
