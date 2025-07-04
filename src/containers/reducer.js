import loginReducer from "./Login/reducer";
import documentsReducer from "./Documents/reducer";
import tripsReducer from "./Trips/reducer";
import officeExpenseReducer from "./OfficeExpense/reducer";
import vehiclesExpenseReducer from "./VehicleExpense/reducer";
import accountReducer from "./Accounts/reducer";
import receiptReducer from "./Receipt/reducer";
import homeReducer from "./Home/reducer";
import reportsReducer from "./Reports/reducer";
import voucherReducer from "./Vouchers/reducer";
import dieselReducer from "./Diesels/reducer";
import productReducer from "./Products/reducer";
import logisticReducer from "./Logistics/reducer";
import vehicleOwnerReducer from "./VehicleOwner/reducer";
import hardwareShopBillsReducer from "./HardwareShopBills/reducer";
import driverReducer from "./Drivers/reducer";
import fleetReducer from "./Fleet/reducer";

const rootReducer = {
  user: loginReducer,
  home: homeReducer,
  documents: documentsReducer,
  trips: tripsReducer,
  drivers: driverReducer,
  officeExpense: officeExpenseReducer,
  vehiclesExpense: vehiclesExpenseReducer,
  accounts: accountReducer,
  receipt: receiptReducer,
  reports: reportsReducer,
  vouchers: voucherReducer,
  diesels: dieselReducer,
  products: productReducer,
  logistics: logisticReducer,
  vehicleOwner: vehicleOwnerReducer,
  hardwareShopBills: hardwareShopBillsReducer,
  fleets: fleetReducer,
};

export default rootReducer;
