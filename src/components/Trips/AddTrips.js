import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import LayoutAdd from "../Layout/LayoutAdd";
import { ROUTES } from "../../utils/constants";
import { addTrips } from "../../containers/Trips/action";

const initialTrip = {
  diNo: "",
  lrNo: "",
  date: new Date().toISOString(),
  partyName: "",
  location: "",
  vehicleNo: "",
  quantity: 0,
  driverName: "",
  driverPhone: "",
  diesel: "",
  dieselIn: "Litre",
  pumpName: "",
  cash: null,
  remarks: "",
};

const AddTrips = (props) => {
  const [trip, setTrip] = useState(initialTrip);
  const history = useHistory();
  const { addLoading } = props.trips;

  const inputFields = [
    { id: "diNo", type: "number", label: "DI No.", required: true },
    { id: "lrNo", label: "LR No.", required: true },
    {
      id: "date",
      type: "date",
      handleChange: (date) => setTrip({ ...trip, date }),
      label: "Date",
    },
    { id: "partyName", label: "Party Name", required: true },
    { id: "location", label: "Location", required: true },
    { id: "vehicleNo", label: "Vehicle No.", required: true },
    { id: "quantity", type: "number", label: "Quantity", required: true },
    { id: "driverName", label: "Driver Name", required: true },
    {
      id: "driverPhone",
      type: "number",
      label: "Driver Phone No.",
      required: true,
    },
    { id: "diesel", type: "number", label: "Diesel" },
    {
      id: "dieselIn",
      label: "Diesel In",
      type: "select",
      menuItems: [
        { label: "Litre", value: "Litre" },
        { label: "Amount", value: "Amount" },
      ],
    },
    {
      id: "pumpName",
      label: "Pump Name",
      type: "customSelect",
      handleChange: (val) => setTrip({ ...trip, pumpName: val }),
      options: [
        "Saurabh Fuels",
        "Saudimini Fuels",
        "Lal Fuels",
        "HPCL",
        "BPCL",
        "IOCL",
      ],
    },
    { id: "cash", type: "number", label: "Cash" },
    { id: "remarks", label: "Remarks" },
  ];

  const handleValueChange = (e) => {
    if (e.target.name === "vehicleNo")
      e.target.value = e.target.value.toUpperCase();
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    history.push(ROUTES.TRIPS);
  };

  const handleReset = () => {
    setTrip(initialTrip);
  };

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.TRIPS);
    };
    props.addTrips(trip, cb);
  };

  return (
    <LayoutAdd
      title="Trips"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={trip}
      submitLoading={addLoading}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};

export default connect(mapStateToProps, { addTrips })(AddTrips);
