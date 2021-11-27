import { useState } from "react";
import { connect } from "react-redux";

import TableCell from "@mui/material/TableCell";

import { getTax, addTax } from "../../containers/Tax/action";
import uploadFileForm from "../../utils/uploadFileForm";

import Layout from "../Layout/Layout";

const Tax = (props) => {
  let { getTax } = props;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  let { loading, tax, addLoading, editLoading } = props.tax;
  const handleFileSubmit = (file) => {
    props.addTax(uploadFileForm(file), getTax);
  };

  if (!tax) tax = [];

  const header = ["name", "age", "phone", "home", "college", "room"];

  tax = [
    {
      name: "shyam",
      age: "20",
      phone: "8109292093",
      home: "tilda",
      college: "bit m,esa",
      room: "202",
    },
    {
      name: "ram",
      age: "20",
      phone: "8109292093",
      home: "tilda",
      college: "bit m,esa",
      room: "202",
    },
    {
      name: "shyad9383m",
      age: "20",
      phone: "8109292093",
      home: "tilda",
      college: "bit m,esa",
      room: "202",
    },
  ];

  tax = tax.filter((val) => {
    return val.name.includes(search);
  });

  const tableRow = header.map((headCell, index) => (
    <TableCell style={{ fontWeight: "600" }} key={index}>
      {headCell}
    </TableCell>
  ));

  const tableBodyFunc = (row) => {
    return header.map((headVal, index) => {
      return <TableCell key={index}>{row[headVal]}</TableCell>;
    });
  };

  const handleDeleteAgree = () => {
    console.log("delete diloag agree");
  };

  const handleAddButton = () => {
    console.log("handle add button");
  };

  return (
    <Layout
      addLoading={addLoading}
      editLoading={editLoading}
      title="Tax"
      handleDeleteAgree={handleDeleteAgree}
      handleFileSubmit={handleFileSubmit}
      search={search}
      setSearch={setSearch}
      data={tax}
      mssgTitle="Tax"
      loading={loading}
      tableRow={tableRow}
      tableBodyFunc={tableBodyFunc}
      numSelected={selected}
      setNumSelected={setSelected}
      fileName="tax"
      handleAddButton={handleAddButton}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    tax: state.tax,
    user: state.user,
  };
};

export default connect(mapStateToProps, { getTax, addTax })(Tax);
