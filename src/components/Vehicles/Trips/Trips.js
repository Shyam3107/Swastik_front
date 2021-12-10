import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import TableCell from "@mui/material/TableCell";

import {
  getTrips,
  deleteTrips,
  uploadTrips,
} from "../../../containers/Trips/action";
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

const Trips = (props) => {
  let { getTrips } = props;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [from, setFrom] = useState(monthStart);
  const [to, setTo] = useState(currentDate);
  let {
    loading,
    trips,
    addLoading,
    editLoading,
    deleteLoading,
    uploadLoading,
  } = props.trips;
  const history = useHistory();

  useEffect(() => {
    getTrips();
  }, [getTrips]);

  const handleFileSubmit = (file) => {
    props.uploadTrips(uploadFileForm(file), getTrips);
  };

  if (!trips || !Array.isArray(trips)) trips = [];

  trips = trips.filter((val) => {
    return (
      moment(from).isSameOrBefore(val.date) &&
      moment(to).isSameOrAfter(val.date) &&
      includesInArray(
        [
          val.diNo,
          val.lrNo,
          val.partyName,
          val.location,
          val.vehicleNo,
          val.driverName,
          val.pumpName ? val.pumpName : "",
        ],
        search
      )
    );
  });

  let downloadData = trips.map((item) => {
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
      props.getTrips();
      setSelected([]);
    };
    props.deleteTrips(selected, cb);
  };

  const handleAddButton = () => {
    history.push(ROUTES.ADD_TRIP);
  };

  const handleEditButton = () => {
    const tripId = selected[0];
    const searchId = trips.filter((val) => val._id === tripId);
    history.push(EDIT_URL(searchId[0].diNo));
  };

  return (
    <Layout
      addLoading={addLoading || uploadLoading}
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
      sampleName="tripSample"
      handleAddButton={handleAddButton}
      handleEditButton={handleEditButton}
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

export default connect(mapStateToProps, {
  getTrips,
  deleteTrips,
  uploadTrips,
})(Trips);
