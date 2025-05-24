import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LayoutAdd from "../Layout/LayoutAdd";
import { addDriver, editDriver } from "../../containers/Drivers/action";
import { ROUTES } from "../../utils/constants";

const initialDriver = {
  name: "",
  driverPhone: "",
  aadharCardNo: "",
  aadharCardDOB: new Date().toISOString(),
  dlNo: "",
  dlDOB: new Date().toISOString(),
  dlValidity: new Date().toISOString(),
  homePhone: "",
  relation: "",
  guarantor: "",
  remarks: "",
  isDriving: false,
  defaulter: false,
};

const Driver = (props) => {
  const [fields, setFields] = useState(initialDriver);
  const { initialFields } = props;
  const history = props.history;
  let { loading } = props.fleets;

  useEffect(() => {
    if (initialFields) setFields(initialFields);
  }, [initialFields]);

  const inputFields = [
    { id: "name", label: "Name", required: true },
    {
      id: "driverPhone",
      label: "Driver Phone",
      required: true,
      customValidate: [{ type: "PHONE" }],
    },
    { id: "aadharCardNo", label: "Aadhar Card No.", required: true },
    {
      id: "aadharCardDOB",
      label: "Aadhar Card DOB",
      type: "date",
      handleChange: (date) => setFields({ ...fields, aadharCardDOB: date }),
    },
    { id: "dlNo", label: "DL No.", required: true },
    {
      id: "dlDOB",
      label: "DL DOB",
      type: "date",
      handleChange: (date) => setFields({ ...fields, dlDOB: date }),
    },
    {
      id: "dlValidity",
      label: "DL Validity",
      type: "date",
      handleChange: (date) => setFields({ ...fields, dlValidity: date }),
      minDate: new Date(),
    },
    {
      id: "homePhone",
      label: "Home Phone",
      required: true,
      customValidate: [{ type: "PHONE" }],
    },
    { id: "relation", label: "Relation", required: true },
    { id: "guarantor", label: "Guarantor", required: true },
    { id: "remarks", label: "Remarks" },
    {
      id: "isDriving",
      label: "Is Driving",
      type: "select",
      menuItems: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    {
      id: "defaulter",
      label: "Defaulter",
      type: "select",
      menuItems: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  ];

  const handleValueChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    history.push(ROUTES.DRIVERS);
  };

  const handleReset = () => {
    if (initialFields) setFields(initialFields);
    else setFields(initialDriver);
  };

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.DRIVERS);
    };
    if (initialFields) props.editDriver(fields, cb);
    else props.addDriver(fields, cb);
  };

  return (
    <LayoutAdd
      title="Drivers"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={fields}
      loading={loading}
      edit={initialFields ? true : false}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    fleets: state.fleets,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addDriver,
    editDriver,
  })(Driver)
);
