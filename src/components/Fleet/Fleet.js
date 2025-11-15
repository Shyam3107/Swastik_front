import { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TableCell from "@mui/material/TableCell";

import Layout from "../Layout/Layout";
import { ROUTES } from "../../utils/constants";
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  filterData,
  VIEW_HISTORY,
  sampleData2
} from "./constants";
import {
  getFleet,
  deleteFleet,
  downloadFleet,
  uploadFleet,
  completeVehicleNum,
} from "../../containers/Fleet/action";
import { access, isOperationAllowed, operations } from "../../utils/utilities";

const Fleet = (props) => {
  let { getFleet } = props;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  let { loading, fleets, downloadLoading } = props.fleets;

  const history = props.history;

  useEffect(() => {
    getFleet();
  }, [getFleet]);

  const handleDeleteAgree = () => {
    const cb = () => {
      getFleet();
      setSelected([]);
    };
    props.deleteFleet(selected, cb);
  };

  const handleAddButton = () => {
    history.push(ROUTES.ADD_FLEETS);
  };

  const handleEditButton = () => {
    const id = selected[0];
    const searchId = fleets?.filter((val) => val._id === id);
    history.push(EDIT_URL(searchId[0].vehicleNo));
  };

  const handleDownload = () => {
    props.downloadFleet();
  };

  const handleFile2Submit = (file) => {
    props.completeVehicleNum(file, () => { });
  };

  const handleFileSubmit = (file) => {
    const cb = () => {
      getFleet();
    };
    props.uploadFleet(file, cb);
  };

  fleets = filterData(fleets, search);

  const tableRow = header.map((headCell) => (
    <TableCell style={{ fontWeight: "600" }} key={headCell}>
      {headCell}
    </TableCell>
  ));

  const tableBodyFunc = (row) => {
    return headerKey.map((headVal) => {
      return (
        <TableCell key={headVal}>
          {headVal === "vehicleNo" ? (
            <Link to={VIEW_HISTORY(row._id)}>{row[headVal]}</Link>
          ) : (
            row[headVal]
          )}
        </TableCell>
      );
    });
  };

  return (
    <Layout
      title="Fleets"
      mssgTitle="Fleets"
      sampleName="Fleet Sample"
      data={fleets}
      sampleData={sampleData}
      loading={loading}
      search={search}
      setSearch={setSearch}
      numSelected={selected}
      setNumSelected={setSelected}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      downloadLoading={downloadLoading}
      upload2ToolTip="Complete the Vehicle No."
      handleFile2Submit={handleFile2Submit}
      sampleData2={sampleData2}
      handleFileSubmit={
        isOperationAllowed(access.FLEETS, operations.CREATE) && handleFileSubmit
      }
      handleDownload={handleDownload}
      handleAddButton={
        isOperationAllowed(access.FLEETS, operations.CREATE) && handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.FLEETS, operations.EDIT) && handleEditButton
      }
      handleDeleteAgree={
        isOperationAllowed(access.FLEETS, operations.DELETE) &&
        handleDeleteAgree
      }
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
    getFleet,
    deleteFleet,
    downloadFleet,
    uploadFleet,
    completeVehicleNum,
  })(Fleet)
);
