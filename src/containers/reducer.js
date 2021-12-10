import { combineReducers } from "redux";
import loginReducer from "./Login/reducer";
import documentsReducer from "./Documents/reducer";
import tripsReducer from "./Trips/reducer";
import officeExpenseReducer from "./OfficeExpense/reducer";
import driverExpenseReducer from "./DriverExpense/reducer";
import vehiclesExpenseReducer from "./VehicleExpense/reducer";

export default combineReducers({
  user: loginReducer,
  documents: documentsReducer,
  trips: tripsReducer,
  officeExpense: officeExpenseReducer,
  driverExpense: driverExpenseReducer,
  vehiclesExpense: vehiclesExpenseReducer,
});
