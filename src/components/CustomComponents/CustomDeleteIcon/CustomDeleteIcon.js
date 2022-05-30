import React, { useState } from "react"
import CustomDialog from "../CustomDialog/CustomDialog"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

const CustomDeleteIcon = ({ handleDeleteAgree, styleButton }) => {
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        handleAgree={handleDeleteAgree}
      />
      <Tooltip title="Delete">
        <IconButton style={styleButton} onClick={() => setOpen(true)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  )
}

export default CustomDeleteIcon
