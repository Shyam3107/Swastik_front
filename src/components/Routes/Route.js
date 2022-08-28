import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Login from "../Login/Login"
import Logout from "../Logout/Logout"
import { ROUTES } from "../../utils/constants"
import Home from "../Home/Home"

import Trips from "../Vehicles/Trips/Trips"
import AddTrips from "../Vehicles/Trips/AddTrips"
import EditTrips from "../Vehicles/Trips/EditTrips"
import ViewTrip from "../Vehicles/Trips/ViewTrip"

import Vouchers from "../Vehicles/Vouchers/Vouchers"
import AddVouchers from "../Vehicles/Vouchers/AddVouchers"
import EditVouchers from "../Vehicles/Vouchers/EditVouchers"
import ViewVoucher from "../Vehicles/Vouchers/ViewVoucher"

import Diesels from "../Diesels/PumpDiesels/Diesels"
import AddDiesels from "../Diesels/PumpDiesels/AddDiesels"
import EditDiesels from "../Diesels/PumpDiesels/EditDiesels"

import VehicleOwner from "../Diesels/VehicleOwner/VehicleOwner"
import AddVehicleOwner from "../Diesels/VehicleOwner/AddVehicleOwner"
import EditVehicleOwner from "../Diesels/VehicleOwner/EditVehicleOwner"

import Documents from "../Vehicles/Documents/Documents"
import AddDocument from "../Vehicles/Documents/AddDocument"
import ViewDocument from "../Vehicles/Documents/ViewDocument"
import EditDocument from "../Vehicles/Documents/EditDocument"

import OfficeExpense from "../Expenses/Office/Office"
import AddOfficeExpense from "../Expenses/Office/AddOffice"
import EditOfficeExpense from "../Expenses/Office/EditOffice"

import VehiclesExpense from "../Expenses/Vehicles/Vehicles"
import AddVehiclesExpense from "../Expenses/Vehicles/AddVehicles"
import EditVehiclesExpense from "../Expenses/Vehicles/EditVehicles"

import Logistic from "../Store/Logistic/Logistic"
import AddLogistic from "../Store/Logistic/AddLogistic"
import EditLogistic from "../Store/Logistic/EditLogistic"

import Product from "../Store/Product/Product"
import AddProduct from "../Store/Product/AddProduct"
import EditProduct from "../Store/Product/EditProduct"
import ViewProduct from "../Store/Product/ViewProduct"

import Bills from "../Store/HardwareShopBills/Bills"
import AddBill from "../Store/HardwareShopBills/AddBill"
import EditBill from "../Store/HardwareShopBills/EditBill"

import Configuration from "../Configuration/Configuration"

import Receipt from "../Receipt/Receipt"
import AddReceipt from "../Receipt/AddReceipt"
import EditReceipt from "../Receipt/EditReceipt"

import Reports from "../Reports/Reports"

const Routes = (props) => {
  const loggedIn = !props.user.loading && props.user.loggedIn

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest}>
        {loggedIn ? children : <Redirect to={ROUTES.LOGIN} />}
      </Route>
    )
  }

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
  ]

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
      {privateRoutes.map((rout, index) => {
        return (
          <PrivateRoute exact path={rout.path} key={index}>
            {rout.noShow ? <Redirect to={ROUTES.HOME} /> : rout.component}
          </PrivateRoute>
        )
      })}
      <Route>
        <Redirect to={ROUTES.HOME} />
      </Route>
    </Switch>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Routes)
