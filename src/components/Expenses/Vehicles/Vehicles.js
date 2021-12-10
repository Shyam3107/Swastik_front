import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import TableCell from "@mui/material/TableCell";

import uploadFileForm from "../../../utils/uploadFileForm";
import Layout from "../../Layout/Layout";
import {
  includesInArray,
  ROUTES,
  monthStart,
  currentDate,
  formatDateInDDMMYYY,
} from "../../../utils/constants";
import { header, headerKey, sampleData, EDIT_URL } from "./constants";
import {
  getExpense,
  deleteExpense,
  uploadExpense,
} from "../../../containers/VehicleExpense/action";

const Vehicles = (props) => {
  let { getExpense } = props;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [from, setFrom] = useState(monthStart);
  const [to, setTo] = useState(currentDate);
  let {
    loading,
    expenses,
    addLoading,
    editLoading,
    deleteLoading,
    uploadLoading,
  } = props.vehiclesExpense;
  const history = useHistory();

  useEffect(() => {
    getExpense();
  }, [getExpense]);

  const handleFileSubmit = (file) => {
    props.uploadExpense(uploadFileForm(file), getExpense);
  };

  if (!expenses || !Array.isArray(expenses)) expenses = [];

  expenses = expenses.filter((val) => {
    return (
      moment(from).isSameOrBefore(val.date) &&
      moment(to).isSameOrAfter(val.date) &&
      includesInArray(
        [
          val.remarks,
          val.pumpName ? val.pumpName : "",
          val.dieselFor ? val.dieselFor : "",
          val.driverName,
          val.vehicleNo,
        ],
        search
      )
    );
  });

  let downloadData = expenses.map((item) => {
    return headerKey.map((val) => {
      if (val === "date") return formatDateInDDMMYYY(item[val]);
      return item[val];
    });
  });

  downloadData = [header, ...downloadData];

  const tableRow = header.map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ));

  const tableBodyFunc = (row) => {
    return headerKey.map((headVal, index) => {
      return (
        <TableCell key={index}>
          {headVal === "date"
            ? formatDateInDDMMYYY(row[headVal])
            : row[headVal]}
        </TableCell>
      );
    });
  };

  const handleDeleteAgree = () => {
    const cb = () => {
      props.getExpense();
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

  return (
    <Layout
      title="Vehicles Expenses"
      fileName="Vehicles Expenses"
      mssgTitle="Expenses"
      sampleName="Vehicles Expenses Sample"
      loading={loading}
      addLoading={addLoading || uploadLoading}
      downloadLoading={addLoading}
      search={search}
      selectedFrom={from}
      selectedTo={to}
      data={expenses}
      downloadData={downloadData}
      editLoading={editLoading}
      deleteLoading={deleteLoading}
      handleDeleteAgree={handleDeleteAgree}
      handleFileSubmit={handleFileSubmit}
      setSearch={setSearch}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      handleAddButton={handleAddButton}
      handleEditButton={handleEditButton}
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      sampleData={sampleData}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    vehiclesExpense: state.vehiclesExpense,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  getExpense,
  deleteExpense,
  uploadExpense,
})(Vehicles);
