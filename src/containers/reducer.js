import { combineReducers } from "redux";
import loginReducer from "./Login/reducer";
import documentsReducer from "./Documents/reducer";
import tripsReducer from "./Trips/reducer";
import officeExpenseReducer from "./OfficeExpense/reducer";
import vehiclesExpenseReducer from "./VehicleExpense/reducer";
import accountReducer from "./Accounts/reducer";
import receiptReducer from "./Receipt/reducer";
import homeReducer from "./Home/reducer";

export default combineReducers({
  user: loginReducer,
  home: homeReducer,
  documents: documentsReducer,
  trips: tripsReducer,
  officeExpense: officeExpenseReducer,
  vehiclesExpense: vehiclesExpenseReducer,
  accounts: accountReducer,
  receipt: receiptReducer,
});
