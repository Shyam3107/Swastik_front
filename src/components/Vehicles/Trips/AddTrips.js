import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LayoutAdd from "../../Layout/LayoutAdd";
import { ROUTES, pumpNames } from "../../../utils/constants";
import { addTrips, editTrips } from "../../../containers/Trips/action";
import { VIEW_URL } from "./constants";
import { user } from "../../../utils/utilities";
import { getFleetListForTrips } from "../../../containers/Fleet/action";

const initialTrip = {
  diNo: "",
  lrNo: "",
  date: new Date().toISOString(),
  loadingPoint: user()?.branch ?? "",
  partyName: "",
  location: "",
  material: "Cement",
  shortage: 0,
  shortageAmount: 0,
  vehicleNo: "",
  quantity: 0,
  bags: 0,
  driverName: "",
  driverPhone: "",
  diesel: 0,
  dieselIn: "",
  pumpName: "",
  cash: 0,
  remarks: "",
  bilingRate: 0,
  rate: 0,
  partyName2: "",
  eWayBillNo: "",
  eWayBillExpiry: new Date().toISOString(),
};

const AddTrips = (props) => {
  const [trip, setTrip] = useState(initialTrip);
  const { initialFields, getFleetListForTrips } = props;
  const history = props.history;
  const { loading } = props.trips;
  let { fleets } = props.fleets;

  useEffect(() => {
    if (initialFields) setTrip(initialFields);
  }, [initialFields]);

  useEffect(() => {
    getFleetListForTrips();
  }, [getFleetListForTrips]);

  const inputFields = [
    {
      id: "diNo",
      label: "DI No.",
      required: true,
      customValidate: [{ type: "DINO" }],
    },
    { id: "lrNo", label: "LR No.", required: true },
    {
      id: "date",
      type: "date",
      handleChange: (date) => setTrip({ ...trip, date }),
      label: "Date",
      maxDate: new Date().toISOString(),
    },
    {
      id: "loadingPoint",
      label: "Loading Point",
      type: "customSelect",
      handleChange: (val) => setTrip({ ...trip, loadingPoint: val }),
      options: [
        "Hirmi",
        "Tilda",
        "Grasim",
        "Shree Cement",
        "Ambuja",
        "Century",
      ],
      required: true,
      //disabled: !isAdmin()
    },
    { id: "partyName", label: "Party Name", required: true },
    { id: "location", label: "Location", required: true },
    {
      id: "vehicleNo",
      label: "Vehicle No.",
      type: "customSelect",
      handleChange: (val) => handleVehicleNoChange(val),
      options: fleets.map((d) => (d ? d.vehicleNo : "None")),
      required: true,
    },
    {
      id: "quantity",
      type: "number",
      label: "Quantity",
      required: true,
      handleChange: (e) => {
        const val = e.target.value;
        return setTrip({
          ...trip,
          quantity: val,
          bags: ((val ?? 0) * 20).toFixed(0),
        });
      },
    },
    { id: "bags", type: "number", label: "Bags" },
    {
      id: "material",
      label: "Material",
      type: "customSelect",
      handleChange: (val) => setTrip({ ...trip, material: val }),
      options: ["Cement", "Coal", "Clinker", "Fly Ash"],
      required: true,
    },
    { id: "shortage", type: "number", label: "Shortage" },
    { id: "shortageAmount", type: "number", label: "Shortage Amount" },
    { id: "driverName", label: "Driver Name", required: true },
    {
      id: "driverPhone",
      type: "number",
      label: "Driver Phone No.",
      required: true,
      customValidate: [{ type: "PHONE" }],
    },
    { id: "diesel", type: "number", label: "Diesel" },
    {
      id: "dieselIn",
      label: "Diesel In",
      type: "select",
      menuItems: [
        { label: "None", value: "" },
        { label: "Litre", value: "Litre" },
        { label: "Amount", value: "Amount" },
      ],
    },
    {
      id: "pumpName",
      label: "Pump Name",
      type: "customSelect",
      handleChange: (val) => setTrip({ ...trip, pumpName: val }),
      options: pumpNames,
    },
    { id: "cash", type: "number", label: "Cash" },
    { id: "remarks", label: "Remarks" },
    { id: "billingRate", type: "number", label: "Billing Rate" },
    { id: "rate", type: "number", label: "Rate" },
    { id: "partyName2", label: "Party Name 2" },
    { id: "eWayBillNo", label: "E-Way Bill No." },
    {
      id: "eWayBillExpiry",
      type: "date",
      handleChange: (eWayBillExpiry) => setTrip({ ...trip, eWayBillExpiry }),
      label: "E-Way Bill Expiry",
    },
  ];

  const handleValueChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleVehicleNoChange = (val) => {
    val = val.toUpperCase();
    for (let i = 0; i < fleets.length; i++) {
      if (fleets[i].vehicleNo === val) {
        setTrip({
          ...trip,
          vehicleNo: val,
          driverName: fleets[i].driverName,
          driverPhone: fleets[i].driverPhone,
        });
        break;
      }
    }
  };

  const handleCancel = () => {
    history.push(ROUTES.TRIPS);
  };

  const handleReset = () => {
    if (initialFields) setTrip(initialFields);
    else setTrip(initialTrip);
  };

  const handleSubmit = (event, view) => {
    const cb = () => {
      if (view) history.push(VIEW_URL(trip.diNo));
      else history.push(ROUTES.TRIPS);
    };
    if (initialFields) props.editTrips(trip, cb);
    else props.addTrips(trip, cb);
  };

  const handleSaveAndView = (event) => {
    handleSubmit(event, true);
  };

  return (
    <LayoutAdd
      title="Trips"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      handle4thButton={handleSaveAndView}
      button4thName={"Submit+View"}
      data={trip}
      loading={loading}
      edit={initialFields ? true : false}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    fleets: state.fleets,
  };
};

export default withRouter(
  connect(mapStateToProps, { addTrips, editTrips, getFleetListForTrips })(
    AddTrips
  )
);
