import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LayoutAdd from "../../Layout/LayoutAdd";
import {
  addExpense,
  editExpense,
} from "../../../containers/VehicleExpense/action";
import { getFleet } from "../../../containers/Fleet/action";
import { ROUTES } from "../../../utils/constants";

const initialExpense = {
  date: new Date().toISOString(),
  vehicleNo: "",
  driverName: "",
  driverPhone: "",
  amount: 0,
  remarks: "",
  expenseFor: "Driver",
};

const Vehicles = (props) => {
  const [expense, setExpense] = useState(initialExpense);
  const { initialFields, getFleet } = props;
  const history = props.history;
  const { loading } = props.vehiclesExpense;
  const fleets = props.fleets.fleets;

  useEffect(() => {
    if (initialFields) setExpense(initialFields);
  }, [initialFields]);

  useEffect(() => {
    getFleet();
  }, [getFleet]);

  const inputFields = [
    {
      id: "date",
      type: "date",
      handleChange: (date) => setExpense({ ...expense, date }),
      label: "Date",
      maxDate: new Date().toISOString(),
    },
    {
      id: "vehicleNo",
      label: "Vehicle No.",
      type: "customSelect",
      handleChange: (val) => handleVehicleNoChange(val),
      options: fleets?.map((d) => d?.vehicleNo),
      required: true,
    },
    { id: "driverName", label: "Driver Name", required: true },
    {
      id: "driverPhone",
      type: "number",
      label: "Driver Phone No.",
      required: true,
      customValidate: [{ type: "PHONE" }],
    },
    { id: "amount", type: "number", label: "Amount", required: true },
    { id: "remarks", label: "Remarks", required: true },
    {
      id: "expenseFor",
      label: "Expense For",
      type: "select",
      menuItems: [
        { label: "Driver", value: "Driver" },
        { label: "Vehicle", value: "Vehicle" },
      ],
    },
  ];

  const handleValueChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleVehicleNoChange = (val) => {
    val = val.toUpperCase();
    for (let i = 0; i < fleets.length; i++) {
      if (fleets[i].vehicleNo === val) {
        setExpense({
          ...expense,
          vehicleNo: val,
          driverName: fleets[i].driverName,
          driverPhone: fleets[i].driverPhone,
        });
        break;
      }
    }
  };

  const handleCancel = () => {
    history.push(ROUTES.VEHICLES_EXPENSE);
  };

  const handleReset = () => {
    if (initialFields) setExpense(initialFields);
    else setExpense(initialExpense);
  };

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.VEHICLES_EXPENSE);
    };
    if (initialFields) props.editExpense(expense, cb);
    else props.addExpense(expense, cb);
  };

  return (
    <LayoutAdd
      title="Vehicle Expenses"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={expense}
      loading={loading}
      edit={initialFields ? true : false}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    vehiclesExpense: state.vehiclesExpense,
    fleets: state.fleets,
  };
};

export default withRouter(
  connect(mapStateToProps, { addExpense, editExpense, getFleet })(Vehicles)
);
