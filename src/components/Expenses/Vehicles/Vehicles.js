import { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import TableCell from "@mui/material/TableCell";

import Layout from "../../Layout/Layout";
import {
  ROUTES,
  monthStart,
  currentDate,
  fromToPayload,
} from "../../../utils/constants";
import {
  header,
  headerKey,
  sampleData,
  EDIT_URL,
  filterData,
} from "./constants";
import {
  getExpense,
  deleteExpense,
  uploadExpense,
  downloadExpense,
} from "../../../containers/VehicleExpense/action";
import {
  access,
  isOperationAllowed,
  operations,
  checkBoxCondition,
} from "../../../utils/utilities";

const Vehicles = (props) => {
  let { getExpense } = props;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [from, setFrom] = useState(monthStart);
  const [to, setTo] = useState(currentDate);
  let { loading, expenses, downloadLoading } = props.vehiclesExpense;
  const history = props.history;

  const handleGo = () => {
    getExpense(fromToPayload(from, to));
  };

  useEffect(() => {
    handleGo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileSubmit = (file) => {
    props.uploadExpense(file, handleGo);
  };

  const handleDownload = () => {
    props.downloadExpense(fromToPayload(from, to));
  };

  const handleDeleteAgree = () => {
    const cb = () => {
      handleGo();
      setSelected([]);
    };
    props.deleteExpense(selected, cb);
  };

  const handleAddButton = () => {
    history.push(ROUTES.ADD_VEHICLES_EXPENSE);
  };

  const handleEditButton = () => {
    const expenseId = selected[0];
    history.push(EDIT_URL(expenseId));
  };

  expenses = filterData(expenses, search);

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
    <Layout
      title="Vehicles Expenses"
      mssgTitle="Expenses"
      sampleName="Vehicles Expenses Sample"
      loading={loading}
      search={search}
      selectedFrom={from}
      selectedTo={to}
      data={expenses}
      handleDownload={handleDownload}
      downloadLoading={downloadLoading}
      handleGo={handleGo}
      handleDeleteAgree={
        isOperationAllowed(access.VEHICLE_EXPENSES, operations.DELETE) &&
        handleDeleteAgree
      }
      handleFileSubmit={
        isOperationAllowed(access.VEHICLE_EXPENSES, operations.CREATE) &&
        handleFileSubmit
      }
      checkBoxCondition={checkBoxCondition}
      setSearch={setSearch}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      handleAddButton={
        isOperationAllowed(access.VEHICLE_EXPENSES, operations.CREATE) &&
        handleAddButton
      }
      handleEditButton={
        isOperationAllowed(access.VEHICLE_EXPENSES, operations.EDIT) &&
        handleEditButton
      }
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      sampleData={sampleData}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    vehiclesExpense: state.vehiclesExpense,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getExpense,
    deleteExpense,
    uploadExpense,
    downloadExpense,
  })(Vehicles)
);
