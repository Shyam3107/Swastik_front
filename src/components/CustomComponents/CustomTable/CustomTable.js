import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import UploadFile from "../UploadFile/UploadFile";
import CustomLoader from "../CustomLoader/CustomLoader";

export const createHeadCells = (headCell, numericHead = []) => {
  return headCell.map((val) => {
    return {
      id: val,
      numeric: numericHead.includes(val),
      disablePadding: false,
      label: val,
    };
  });
};

export const createDataCells = (dataCell, headCell) => {
  let obj = {};
  dataCell.forEach((val, index) => (obj[headCell[index]] = val));
  return obj;
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function CustomTable({
  onFileUpload,
  rows,
  headCells,
  heading,
  loading,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.min(3, (1 + page) * rowsPerPage - rows.length) : 0;

  const createSortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          style={{ margin: "10px 0 0 10px" }}
        >
          {heading}
          {onFileUpload && (
            <span style={{ float: "right", marginRight: "10px" }}>
              <UploadFile onFileUpload={onFileUpload} />{" "}
            </span>
          )}
        </Typography>

        {!loading && rows.length > 0 && (
          <React.Fragment>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : "asc"}
                          onClick={createSortHandler(headCell.id)}
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                              {order === "desc"
                                ? "sorted descending"
                                : "sorted ascending"}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow hover key={index}>
                          {headCells.map((headVal, ind) => {
                            return (
                              <TableCell key={ind}>{row[headVal.id]}</TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, p) => setPage(p)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </React.Fragment>
        )}
        {loading && <CustomLoader />}
        {!loading && rows.length === 0 && (
          <Box
            style={{
              textAlign: "center",
              padding: "20px 0",
              fontWeight: "500",
            }}
          >
            No {heading} found
          </Box>
        )}
      </Paper>
    </Box>
  );
}
