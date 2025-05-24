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
} from "./constants";
import {
  getDrivers,
  uploadDriver,
  deleteDriver,
  downloadDrivers,
} from "../../containers/Drivers/action";
import { access, isOperationAllowed, operations } from "../../utils/utilities";

const Drivers = (props) => {
  let { getDrivers } = props;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  let { loading, drivers, downloadLoading } = props.drivers;
  const history = props.history;

  useEffect(() => {
    getDrivers();
  }, [getDrivers]);

  const handleDeleteAgree = () => {
    const cb = () => {
      getDrivers();
      setSelected([]);
    };
    props.deleteDriver(selected, cb);
  };

  const handleAddButton = () => {
    history.push(ROUTES.ADD_DRIVERS);
  };

  const handleEditButton = () => {
    const id = selected[0];
    history.push(EDIT_URL(id));
  };

  const handleDownload = () => {
    props.downloadFleet();
  };

  const handleFileSubmit = (file) => {
    const cb = () => {
      getDrivers();
    };
    props.uploadDriver(file, cb);
  };

  drivers = filterData(drivers, search);

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
            <Link to={EDIT_URL(row[headVal])}>{row[headVal]}</Link>
          ) : (
            row[headVal]
          )}
        </TableCell>
      );
    });
  };

  return (
    <Layout
      title="Drivers"
      mssgTitle="Drivers"
      sampleName="Driver Sample"
      data={drivers}
      sampleData={sampleData}
      loading={loading}
      search={search}
      setSearch={setSearch}
      numSelected={selected}
      setNumSelected={setSelected}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      downloadLoading={downloadLoading}
      handleFileSubmit={
        isOperationAllowed(access.DRIVERS, operations.CREATE) &&
        handleFileSubmit
      }
      handleDownload={handleDownload}
      handleAddButton={
        isOperationAllowed(access.DRIVERS, operations.CREATE) && handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.DRIVERS, operations.EDIT) && handleEditButton
      }
      handleDeleteAgree={
        isOperationAllowed(access.DRIVERS, operations.DELETE) &&
        handleDeleteAgree
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    drivers: state.drivers,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getDrivers,
    deleteDriver,
    downloadDrivers,
    uploadDriver,
  })(Drivers)
);
