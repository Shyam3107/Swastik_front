import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import LayoutAdd from "../Layout/LayoutAdd";
import { ROUTES } from "../../utils/constants";
import { addDocuments, editDocuments } from "../../containers/Documents/action";

const initialDocument = {
  vehicleNo: "",
  taxPaidOn: new Date().toISOString(),
  taxPaidUpto: new Date().toISOString(),
  insurancePaidOn: new Date().toISOString(),
  insurancePaidUpto: new Date().toISOString(),
  fitnessPaidOn: new Date().toISOString(),
  fitnessPaidUpto: new Date().toISOString(),
};

const AddDocument = (props) => {
  const { addLoading, editLoading, loading } = props.documents;
  const { initialFields } = props;
  const [document, setDocument] = useState(initialDocument);
  const history = useHistory();

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
    },
    {
      id: "taxPaidUpto",
      type: "date",
      handleChange: (date) => setDocument({ ...document, taxPaidUpto: date }),
      label: "Tax Paid Upto",
    },
    {
      id: "insurancePaidOn",
      type: "date",
      handleChange: (date) =>
        setDocument({ ...document, insurancePaidOn: date }),
      label: "Insurance Paid On",
    },
    {
      id: "insurancePaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({ ...document, insurancePaidUpto: date }),
      label: "Insurance Paid Upto",
    },
    {
      id: "fitnessPaidOn",
      type: "date",
      handleChange: (date) => setDocument({ ...document, fitnessPaidOn: date }),
      label: "Fitness Paid On",
    },
    {
      id: "fitnessPaidUpto",
      type: "date",
      handleChange: (date) =>
        setDocument({ ...document, fitnessPaidUpto: date }),
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

export default connect(mapStateToProps, { addDocuments, editDocuments })(
  AddDocument
);
