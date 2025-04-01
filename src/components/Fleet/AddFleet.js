import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LayoutAdd from "../Layout/LayoutAdd";
import { addFleet, editFleet } from "../../containers/Fleet/action";
import { ROUTES } from "../../utils/constants";

const initialFleet = {
  vehicleNo: "",
  owner: "SELF",
  ownerName: "",
};

const Fleet = (props) => {
  const [fields, setFields] = useState(initialFleet);
  const { initialFields } = props;
  const history = props.history;
  let { loading } = props.fleets;

  useEffect(() => {
    if (initialFields) setFields(initialFields);
  }, [initialFields]);

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
  ];

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
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addFleet,
    editFleet,
  })(Fleet)
);
