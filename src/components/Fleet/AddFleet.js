import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LayoutAdd from "../Layout/LayoutAdd";
import { addFleet, editFleet } from "../../containers/Fleet/action";
import { getDrivers } from "../../containers/Drivers/action";
import { ROUTES, InputTypes } from "../../utils/constants";
import moment from "moment";

const initialFleet = {
  vehicleNo: "",
  owner: "SELF",
  ownerName: "",
  remarks: "",
  driver: null,
  dlValidity: new Date().toISOString(),
  driverJoiningDate: new Date().toISOString(),
  defaulter: "",
  driverRemarks: "",
};

const Fleet = (props) => {
  const [fields, setFields] = useState(initialFleet);
  const { initialFields, getDrivers } = props;
  const history = props.history;
  let { loading } = props.fleets;
  let { drivers } = props.drivers;

  useEffect(() => {
    if (initialFields) setFields(initialFields);
  }, [initialFields]);

  useEffect(() => {
    getDrivers();
  }, [getDrivers]);

  const inputFields = [
    { id: "vehicleNo", label: "Vehicle No.", required: true },
    {
      id: "owner",
      label: "Owner",
      required: true,
      type: "select",
      menuItems: [
        { label: "SELF", value: "SELF" },
        { label: "ATTACHED", value: "ATTACHED" },
      ],
    },
    {
      id: "ownerName",
      label: "Owner Name",
      disabled: fields.owner === "SELF",
      required: fields.owner === "ATTACHED",
    },
    {
      id: "remarks",
      label: "Remarks",
    },
    {
      id: "driver",
      label: "Driver",
      type: InputTypes.SELECT_AUTO_COMPLETE,
      options: [
        { label: "None", id: null },
        ...(drivers ?? []).map((val) => {
          return { label: val.name + " - " + val.dlNo, id: val._id };
        }),
      ],
      handleChange: (val) => handleDriverChange(val),
    },
    {
      id: "dlValidity",
      label: "DL Validity",
      type: "date",
      disabled: true,
    },
    {
      id: "defaulter",
      label: "Driver Defaulter",
      disabled: true,
    },
    {
      id: "driverRemarks",
      label: "Driver Remarks",
      disabled: true,
    },
    {
      id: "driverJoiningDate",
      label: "Driver Joining Date",
      type: "date",
      handleChange: (date) => setFields({ ...fields, driverJoiningDate: date }),
    },
  ];

  const handleDriverChange = (val) => {
    val = val.target.value;
    if (val === null) {
      setFields({
        ...fields,
        dlValidity: new Date().toISOString(),
        driver: null,
      });
      return;
    }
    drivers.forEach((driver) => {
      if (driver._id === val) {
        const dlValidity = moment(
          driver.dlValidity,
          "DD-MM-YYYY"
        ).toISOString();
        setFields({
          ...fields,
          dlValidity,
          driver: val,
          defaulter: driver.defaulter,
          driverRemarks: driver.remarks,
        });
      }
    });
  };

  const handleValueChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    history.push(ROUTES.FLEETS);
  };

  const handleReset = () => {
    if (initialFields) setFields(initialFields);
    else setFields(initialFleet);
  };

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.FLEETS);
    };
    if (initialFields) props.editFleet(fields, cb);
    else props.addFleet(fields, cb);
  };

  return (
    <LayoutAdd
      title="Fleets"
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
    drivers: state.drivers,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addFleet,
    editFleet,
    getDrivers,
  })(Fleet)
);
