import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LayoutAdd from "../Layout/LayoutAdd";
import { addDriver, editDriver } from "../../containers/Drivers/action";
import { InputTypes, ROUTES } from "../../utils/constants";
import { getGuarantors } from "../../containers/Drivers/action";
import moment from "moment";

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
  guarantor: null,
  remarks: "",
  isDriving: false,
  defaulter: false,
};

const Driver = (props) => {
  const [fields, setFields] = useState(initialDriver);
  const { initialFields, getGuarantors } = props;
  const history = props.history;
  let { loading } = props.fleets;
  let { guarantors } = props.guarantors;

  useEffect(() => {
    if (initialFields) setFields(initialFields);
  }, [initialFields]);

  useEffect(() => {
    getGuarantors();
  }, [getGuarantors]);

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
    {
      id: "dlNo",
      label: "DL No.",
      required: true,
      customValidate: [{ type: "ALPHANUMERIC" }],
    },
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
    {
      id: "guarantor",
      label: "Guarantor",
      type: InputTypes.SELECT_AUTO_COMPLETE,
      options: [
        { label: "None", id: null },
        ...(guarantors ?? []).map((val) => {
          return { label: val.name + " - " + val.dlNo, id: val._id };
        }),
      ],
      handleChange: (val) => handleGuarantorChange(val),
    },
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

  const handleGuarantorChange = (val) => {
    val = val.target.value;
    if (val === null) {
      setFields({
        ...fields,
        guarantor: null,
      });
      return;
    }
    guarantors.forEach((driver) => {
      if (driver._id === val) {
        // const dlValidity = moment(
        //   driver.dlValidity,
        //   "DD-MM-YYYY"
        // ).toISOString();
        setFields({
          ...fields,
          guarantor: val,
        });
      }
    });
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
    guarantors: state.drivers,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getGuarantors,
    addDriver,
    editDriver,
  })(Driver)
);
