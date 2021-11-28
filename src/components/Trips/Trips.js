import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import TableCell from "@mui/material/TableCell";

import { getTrips, addTrips, deleteTrips } from "../../containers/Trips/action";
import uploadFileForm from "../../utils/uploadFileForm";
import Layout from "../Layout/Layout";
import {
  formatDate,
  includesInArray,
  ROUTES,
  monthStart,
  currentDate,
} from "../../utils/constants";
import { header, headerKey, sampleData } from "./constants";

const Trips = (props) => {
  let { getTrips } = props;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [from, setFrom] = useState(monthStart);
  const [to, setTo] = useState(currentDate);
  let { loading, trips, addLoading, editLoading, deleteLoading } = props.trips;
  const history = useHistory();

  const handleFileSubmit = (file) => {
    props.addTrips(uploadFileForm(file), getTrips);
  };

  if (!trips) trips = [];

  trips = [
    {
      _id: "1",
      diNo: "728282772",
      lrNo: "2827810",
      date: formatDate(new Date()),
      partyName: "Baloda",
      location: "Hirmi",
      vehicleNo: "CG04JB1050",
      quantity: 65,
      driverName: "Ashok",
      driverPhone: "292772",
      diesel: 29,
      dieselIn: "LTR",
      pumpName: "Saudimini",
      cash: 17171,
      remarks: "advance",
    },
  ];

  trips = trips.filter((val) => {
    return includesInArray(
      [
        val.diNo,
        val.lrNo,
        val.partyName,
        val.location,
        val.vehicleNo,
        val.driverName,
      ],
      search
    );
  });

  let downloadData = trips.map((item) => {
    return headerKey.map((val) => {
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
      return <TableCell key={index}>{row[headVal]}</TableCell>;
    });
  };

  const handleDeleteAgree = () => {
    props.deleteTrips(selected, props.getTrips);
  };

  const handleAddButton = () => {
    history.push(ROUTES.ADD_TRIP);
  };

  return (
    <Layout
      addLoading={addLoading}
      editLoading={editLoading}
      deleteLoading={deleteLoading}
      title="Trips"
      handleDeleteAgree={handleDeleteAgree}
      handleFileSubmit={handleFileSubmit}
      search={search}
      setSearch={setSearch}
      data={trips}
      mssgTitle="Trips"
      loading={loading}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      fileName="trips"
      handleAddButton={handleAddButton}
      setSelectedFrom={setFrom}
      setSelectedTo={setTo}
      selectedFrom={from}
      selectedTo={to}
      sampleData={sampleData}
      downloadData={downloadData}
      downloadLoading={addLoading}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    user: state.user,
  };
};

export default connect(mapStateToProps, { getTrips, addTrips, deleteTrips })(
  Trips
);
