import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { ROUTES } from "../../utils/constants";
import Home from "../Home/Home";

// TRIPS
import Trips from "../Vehicles/Trips/Trips";
import AddTrips from "../Vehicles/Trips/AddTrips";
import EditTrips from "../Vehicles/Trips/EditTrips";
import ViewTrip from "../Vehicles/Trips/ViewTrip";
import TripsByVehicle from "../Vehicles/Trips/TripsByVehicle";

// VOUCHERS
import Vouchers from "../Vehicles/Vouchers/Vouchers";
import AddVouchers from "../Vehicles/Vouchers/AddVouchers";
import EditVouchers from "../Vehicles/Vouchers/EditVouchers";
import ViewVoucher from "../Vehicles/Vouchers/ViewVoucher";

// DIESELS
import Diesels from "../Diesels/PumpDiesels/Diesels";
import AddDiesels from "../Diesels/PumpDiesels/AddDiesels";
import EditDiesels from "../Diesels/PumpDiesels/EditDiesels";
import ViewDieselsByPump from "../Diesels/PumpDiesels/ViewDieselsByPump";
import ViewDieselsByVehicle from "../Diesels/PumpDiesels/ViewDieselsByVehicle";

// VEHICLE OWNER
import VehicleOwner from "../Diesels/VehicleOwner/VehicleOwner";
import AddVehicleOwner from "../Diesels/VehicleOwner/AddVehicleOwner";
import EditVehicleOwner from "../Diesels/VehicleOwner/EditVehicleOwner";

// DOCMENTS
import Documents from "../Vehicles/Documents/Documents";
import AddDocument from "../Vehicles/Documents/AddDocument";
import ViewDocument from "../Vehicles/Documents/ViewDocument";
import EditDocument from "../Vehicles/Documents/EditDocument";

// DRIVERS
import Drivers from "../Drivers/Drivers";
import AddDriver from "../Drivers/AddDriver";
import EditDriver from "../Drivers/EditDriver";
import ViewDriver from "../Drivers/ViewDriver";

// OFFICE EXPENSE
import OfficeExpense from "../Expenses/Office/Office";
import AddOfficeExpense from "../Expenses/Office/AddOffice";
import EditOfficeExpense from "../Expenses/Office/EditOffice";

// VEHICLE EXPENSE
import VehiclesExpense from "../Expenses/Vehicles/Vehicles";
import AddVehiclesExpense from "../Expenses/Vehicles/AddVehicles";
import EditVehiclesExpense from "../Expenses/Vehicles/EditVehicles";

// LOGISTIC
import Logistic from "../Store/Logistic/Logistic";
import AddLogistic from "../Store/Logistic/AddLogistic";
import EditLogistic from "../Store/Logistic/EditLogistic";

// PRODUCT
import Product from "../Store/Product/Product";
import AddProduct from "../Store/Product/AddProduct";
import EditProduct from "../Store/Product/EditProduct";
import ViewProduct from "../Store/Product/ViewProduct";

// BILLS
import Bills from "../Store/HardwareShopBills/Bills";
import AddBill from "../Store/HardwareShopBills/AddBill";
import EditBill from "../Store/HardwareShopBills/EditBill";
import ViewShopBills from "../Store/HardwareShopBills/ViewShopBills";
import ViewVehicleBills from "../Store/HardwareShopBills/ViewVehicleBills";

// CONFIGUTAION
import Configuration from "../Configuration/Configuration";

// RECEIPT
import Receipt from "../Receipt/Receipt";
import AddReceipt from "../Receipt/AddReceipt";
import EditReceipt from "../Receipt/EditReceipt";

// REPORTS
import Reports from "../Reports/Reports";
import SiteReport from "../Reports/SiteReport";
import AllSiteReport from "../Reports/AllSite";

// FLEETS
import Fleet from "../Fleet/Fleet";
import AddFleet from "../Fleet/AddFleet";
import EditFleet from "../Fleet/EditFleet";

const Routes = (props) => {
  const loggedIn = !props.user.loading && props.user.loggedIn;

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest}>
        {loggedIn ? children : <Redirect to={ROUTES.LOGIN} />}
      </Route>
    );
  };

  const privateRoutes = [
    {
      path: ROUTES.HOME,
      component: <Home />,
    },
    {
      path: ROUTES.LOGOUT,
      component: <Logout />,
    },

    // TRIPS
    {
      path: ROUTES.TRIPS,
      component: <Trips />,
    },
    {
      path: ROUTES.ADD_TRIP,
      component: <AddTrips />,
    },
    {
      path: ROUTES.EDIT_TRIP,
      component: <EditTrips />,
    },
    {
      path: ROUTES.VIEW_TRIP,
      component: <ViewTrip />,
    },
    {
      path: ROUTES.VIEW_TRIP_BY_VEHICLE,
      component: <TripsByVehicle />,
    },

    // VOUCHERS
    {
      path: ROUTES.VOUCHERS,
      component: <Vouchers />,
    },
    {
      path: ROUTES.ADD_VOUCHER,
      component: <AddVouchers />,
    },
    {
      path: ROUTES.EDIT_VOUCHER,
      component: <EditVouchers />,
    },
    {
      path: ROUTES.VIEW_VOUCHER,
      component: <ViewVoucher />,
    },

    // DIESELS
    {
      path: ROUTES.DIESELS,
      component: <Diesels />,
    },
    {
      path: ROUTES.ADD_DIESEL,
      component: <AddDiesels />,
    },
    {
      path: ROUTES.EDIT_DIESEL,
      component: <EditDiesels />,
    },
    {
      path: ROUTES.VIEW_DIESEL_BY_PUMP,
      component: <ViewDieselsByPump />,
    },
    {
      path: ROUTES.VIEW_DIESEL_BY_VEHICLE,
      component: <ViewDieselsByVehicle />,
    },

    // VEHICLE OWNER
    {
      path: ROUTES.VEHICLES_OWNER,
      component: <VehicleOwner />,
    },
    {
      path: ROUTES.ADD_VEHICLE_OWNER,
      component: <AddVehicleOwner />,
    },
    {
      path: ROUTES.EDIT_VEHICLE_OWNER,
      component: <EditVehicleOwner />,
    },

    //FLEETS
    {
      path: ROUTES.FLEETS,
      component: <Fleet />,
    },
    {
      path: ROUTES.ADD_FLEETS,
      component: <AddFleet />,
    },
    {
      path: ROUTES.EDIT_FLEETS,
      component: <EditFleet />,
    },

    // DOCUMENTS
    {
      path: ROUTES.DOCUMENTS,
      component: <Documents />,
    },
    {
      path: ROUTES.ADD_DOCUMENT,
      component: <AddDocument />,
    },
    {
      path: ROUTES.VIEW_DOCUMENT,
      component: <ViewDocument />,
    },
    {
      path: ROUTES.EDIT_DOCUMENT,
      component: <EditDocument />,
    },

    // DRIVERS
    {
      path: ROUTES.DRIVERS,
      component:<Drivers />,
    },
    {
      path: ROUTES.ADD_DRIVERS,
      component: <AddDriver />,
    },
    {
      path: ROUTES.EDIT_DRIVERS,
      component: <EditDriver />,
    },
    {
      path: ROUTES.VIEW_DRIVERS,
      component: <ViewDriver />,
    },

    // OFFICE EXPENSE
    {
      path: ROUTES.OFFICE_EXPENSE,
      component: <OfficeExpense />,
    },
    {
      path: ROUTES.OFFICE_EXPENSE,
      component: <OfficeExpense />,
    },
    {
      path: ROUTES.ADD_OFFICE_EXPENSE,
      component: <AddOfficeExpense />,
    },
    {
      path: ROUTES.EDIT_OFFICE_EXPENSE,
      component: <EditOfficeExpense />,
    },

    // VEHICLE EXPENSE
    {
      path: ROUTES.VEHICLES_EXPENSE,
      component: <VehiclesExpense />,
    },
    {
      path: ROUTES.ADD_VEHICLES_EXPENSE,
      component: <AddVehiclesExpense />,
    },
    {
      path: ROUTES.EDIT_VEHICLES_EXPENSE,
      component: <EditVehiclesExpense />,
    },

    // RECEIPT
    {
      path: ROUTES.RECEIPT,
      component: <Receipt />,
    },
    {
      path: ROUTES.EDIT_RECEIPT,
      component: <EditReceipt />,
    },
    {
      path: ROUTES.ADD_RECEIPT,
      component: <AddReceipt />,
    },

    // PRODUCT
    {
      path: ROUTES.PRODUCT,
      component: <Product />,
    },
    {
      path: ROUTES.EDIT_PRODUCT,
      component: <EditProduct />,
    },
    {
      path: ROUTES.ADD_PRODUCT,
      component: <AddProduct />,
    },
    {
      path: ROUTES.VIEW_PRODUCT,
      component: <ViewProduct />,
    },

    // LOGISTICS
    {
      path: ROUTES.LOGISTIC,
      component: <Logistic />,
    },
    {
      path: ROUTES.EDIT_LOGISTIC,
      component: <EditLogistic />,
    },
    {
      path: ROUTES.ADD_LOGISTIC,
      component: <AddLogistic />,
    },

    // HARDWARE SHOP BILLS
    {
      path: ROUTES.HARDWARE_SHOP_BILL,
      component: <Bills />,
    },
    {
      path: ROUTES.EDIT_HARDWARE_SHOP_BILL,
      component: <EditBill />,
    },
    {
      path: ROUTES.ADD_HARDWARE_SHOP_BILL,
      component: <AddBill />,
    },
    {
      path: ROUTES.VIEW_HARDWARE_SHOP_BILL_BY_SHOP,
      component: <ViewShopBills />,
    },
    {
      path: ROUTES.VIEW_HARDWARE_SHOP_BILL_BY_VEHICLE,
      component: <ViewVehicleBills />,
    },

    // CONFIGURATION
    {
      path: ROUTES.CONFIGURATION,
      component: <Configuration />,
    },

    // REPORTS
    {
      path: ROUTES.REPORTS,
      component: <Reports />,
    },
    {
      path: ROUTES.VIEW_OWN_REPORT,
      component: <SiteReport />,
    },
    {
      path: ROUTES.VIEW_ALL_SITE_REPORT,
      component: <AllSiteReport />,
    },
  ];

  return (
    <Switch>
      <Route exact path="/">
        {loggedIn ? (
          <Redirect to={ROUTES.HOME} />
        ) : (
          <Redirect to={ROUTES.LOGIN} />
        )}
      </Route>
      <Route exact path={ROUTES.LOGIN}>
        {loggedIn ? <Redirect to={ROUTES.HOME} /> : <Login />}
      </Route>
      {privateRoutes.map((rout) => {
        return (
          <PrivateRoute exact path={rout.path} key={rout.path}>
            {rout.noShow ? <Redirect to={ROUTES.HOME} /> : rout.component}
          </PrivateRoute>
        );
      })}
      <Route>
        <Redirect to={ROUTES.HOME} />
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Routes);
