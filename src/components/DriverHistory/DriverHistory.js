import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { withRouter } from "react-router";
import TableCell from "@mui/material/TableCell";

import {
  ROUTES,
} from "../../utils/constants";
import { getDriverHistory } from "../../containers/DriverHistory/action";
import LayoutView from "../Layout/LayoutView";
import { header, headerKey, filterData } from "./constants";
import {
  checkBoxCondition,
} from "../../utils/utilities";
import CustomTableOutput from "../CustomComponents/CustomTableOutput/CustomTableOutput";

import { API } from "../../APIs/APIs";

const Comp = (props) => {
  const history = props.history;
  const [search, setSearch] = useState("");
  const params = useParams();
  const { vehicleId, driverId } = params;
  const { getDriverHistory } = props;
  let { loading, downloadLoading, driverHistory } = props.driverHistory;
  const tableData = filterData(driverHistory?.data ?? [], search);
  const mssgTitle = "No Driver History Found";

  let selected = [];

  const handleGo = () => {
    getDriverHistory({
      url: API.GET_DRIVER_HISTORY,
      driverId,
      vehicleId,
    });
  };

  useEffect(() => {
    handleGo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBack = () => {
    history.push(ROUTES.DRIVER_HISTORY);
  };

  //   const handleAddButton = () => {
  //     history.push(ROUTES.ADD_DRIVER_HISTORY);
  //   };

  const tableRow = [...header, "Added By"].map((headCell) => (
    <TableCell style={{ fontWeight: "600" }} key={headCell}>
      {headCell}
    </TableCell>
  ));

  const tableBodyFunc = (row) => {
    return [...headerKey, "addedBy"].map((headVal) => {
      return <TableCell key={headVal}>{row[headVal]}</TableCell>;
    });
  };

  return (
    <LayoutView
      title={driverId}
      loading={loading}
      data={driverHistory}
      //viewFields={fields}
      search={search}
      setSearch={setSearch}
      handleBack={handleBack}
      handleGo={handleGo}
      //   handleAddButton={
      //     isOperationAllowed(access.TRIPS, operations.CREATE) && handleAddButton
      //   }
      numSelected={selected}
      downloadLoading={downloadLoading}
    >
      <CustomTableOutput
        data={tableData}
        mssgTitle={mssgTitle}
        loading={loading}
        tableRow={tableRow}
        tableBodyFunc={tableBodyFunc}
        //numSelected={numSelected}
        //setNumSelected={setNumSelected}
        checkBoxCondition={checkBoxCondition}
      />
    </LayoutView>
  );
};

const mapStateToProps = (state) => {
  return {
    driverHistory: state.driverHistory,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getDriverHistory,
  })(Comp)
);
