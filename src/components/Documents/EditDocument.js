import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getDocuments } from "../../containers/Documents/action";
import AddDocument from "./AddDocument";

const EditDocument = (props) => {
  let { documents } = props.documents;
  const params = useParams();
  const { getDocuments } = props;
  const { vehicleNo } = params;

  useEffect(() => {
    getDocuments({ vehicleNo });
  }, [vehicleNo, getDocuments]);

  return <AddDocument initialFields={documents} />;
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

export default connect(mapStateToProps, { getDocuments })(EditDocument);
