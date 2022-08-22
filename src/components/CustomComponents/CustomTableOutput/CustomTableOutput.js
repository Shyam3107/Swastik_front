import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableHead from "@mui/material/TableHead"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import CustomLoader from "../CustomLoader/CustomLoader"
import Checkbox from "@mui/material/Checkbox"
import Paper from "@mui/material/Paper"
import toastMessage from "../ToastMessage/toastMessage"
import { error } from "../../../utils/constants"

const CustomTableOutput = ({
  data = [],
  mssg = "",
  mssgTitle = "Record",
  loading,
  tableRow,
  tableBody = null,
  tableBodyFunc,
  numSelected = [],
  setNumSelected,
  checkBoxCondition,
  selectedFrom,
  selectedTo,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    setPage(0)
  }, [selectedFrom, selectedTo, data])

  const emptyRows =
    page > 0 ? Math.min(3, (1 + page) * rowsPerPage - data.length) : 0

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isItemSelected = (id) => {
    return numSelected.includes(id._id)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      let newSelecteds = []
      data.forEach((n) => {
        if (!checkBoxCondition || checkBoxCondition(n)) newSelecteds.push(n._id)
      })
      setNumSelected(newSelecteds)
      return
    }
    setNumSelected([])
  }

  const handleSelectClick = (event, row) => {
    if (checkBoxCondition && !checkBoxCondition(row))
      return toastMessage("You can't select Others Data", error)
    const selectedIndex = numSelected.indexOf(row._id)
    let newSelected = []
    if (selectedIndex < 0) {
      newSelected = [...numSelected, row._id]
    } else {
      newSelected = [...numSelected]
      newSelected.splice(selectedIndex, 1)
    }
    setNumSelected(newSelected)
  }

  if (loading) return <CustomLoader />
  else if (!loading && data.length === 0)
    return (
      <Box
        style={{
          textAlign: "center",
          padding: "20px 0",
          fontWeight: "600",
        }}
      >
        {mssg ? mssg : `No ${mssgTitle} Found`}
      </Box>
    )
  else if (!loading && data.length > 0)
    return (
      <Box overflow="auto">
        <TableContainer
          component={Paper}
          style={{ marginTop: "10px", overflowX: "auto" }}
        >
          <Table sx={{ maxWidth: "100%" }}>
            <TableHead>
              <TableRow>
                {setNumSelected && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        numSelected.length > 0 &&
                        numSelected.length < data.length
                      }
                      checked={
                        data.length > 0 && numSelected.length === data.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                )}
                {tableRow}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBodyFunc &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isSelected = isItemSelected(row)
                    return (
                      <TableRow hover key={index} selected={isSelected}>
                        {setNumSelected && (
                          <TableCell
                            padding="checkbox"
                            onClick={(event) => handleSelectClick(event, row)}
                          >
                            <Checkbox color="primary" checked={isSelected} />
                          </TableCell>
                        )}
                        {tableBodyFunc(row)}
                      </TableRow>
                    )
                  })}
              {tableBody}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                ></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, p) => setPage(p)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    )
}

export default CustomTableOutput
