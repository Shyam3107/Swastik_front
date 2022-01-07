import { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router";
import LayoutAdd from "../../Layout/LayoutAdd";
import { ROUTES, formatInDayEnd } from "../../../utils/constants";
import {
  addDocuments,
  editDocuments,
} from "../../../containers/Documents/action";

const initialDocument = {
  vehicleNo: "",
  taxPaidOn: moment().toISOString(),
  taxPaidUpto: formatInDayEnd(),
  insurancePaidOn: moment().toISOString(),
  insurancePaidUpto: formatInDayEnd(),
  fitnessPaidOn: moment().toISOString(),
  fitnessPaidUpto: formatInDayEnd(),
};

const AddDocument = (props) => {
  const { addLoading, editLoading, loading } = props.documents;
  const { initialFields } = props;
  const [document, setDocument] = useState(initialDocument);
  const history = props.history;

  useEffect(() => {
    if (initialFields) setDocument(initialFields);
  }, [initialFields]);

  const inputFields = [
    { id: "vehicleNo", label: "Vehicle No.", required: true },
    {
      id: "taxPaidOn",
      type: "date",
      handleChange: (date) => setDocument({ ...document, taxPaidOn: date }),
      label: "Tax Paid On",
      maxDate: moment().toISOString(),
    },
    {
      id: "taxPaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({ ...document, taxPaidUpto: formatInDayEnd(date) }),
      label: "Tax Paid Upto",
    },
    {
      id: "insurancePaidOn",
      type: "date",
      handleChange: (date) =>
        setDocument({ ...document, insurancePaidOn: date }),
      label: "Insurance Paid On",
      maxDate: moment().toISOString(),
    },
    {
      id: "insurancePaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({
          ...document,
          insurancePaidUpto: formatInDayEnd(date),
        }),
      label: "Insurance Paid Upto",
    },
    {
      id: "fitnessPaidOn",
      type: "date",
      handleChange: (date) => setDocument({ ...document, fitnessPaidOn: date }),
      label: "Fitness Paid On",
      maxDate: moment().toISOString(),
    },
    {
      id: "fitnessPaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({
          ...document,
          fitnessPaidUpto: formatInDayEnd(date),
        }),
      label: "Fitness Paid Upto",
    },
  ];

  const handleValueChange = (e) => {
    if (e.target.name === "vehicleNo")
      e.target.value = e.target.value.toUpperCase();
    setDocument({ ...document, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    history.push(ROUTES.DOCUMENTS);
  };

  const handleReset = () => {
    if (initialFields) setDocument(initialFields);
    else setDocument(initialDocument);
  };

  const handleSubmit = () => {
    const cb = () => {
      history.push(ROUTES.DOCUMENTS);
    };
    if (initialFields) props.editDocuments(document, cb);
    else props.addDocuments(document, cb);
  };

  return (
    <LayoutAdd
      title="Documents"
      inputFields={inputFields}
      handleValueChange={handleValueChange}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      data={document}
      loading={loading}
      submitLoading={addLoading || editLoading}
      edit={initialFields ? true : false}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

export default withRouter(
  connect(mapStateToProps, { addDocuments, editDocuments })(AddDocument)
);
