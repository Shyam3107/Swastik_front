import { combineReducers } from "redux";
import loginReducer from "./Login/reducer";
import documentsReducer from "./Documents/reducer";
import tripsReducer from "./Trips/reducer";

export default combineReducers({
  user: loginReducer,
  documents: documentsReducer,
  trips: tripsReducer,
});
