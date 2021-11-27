import React, { useState } from "react";
import CustomDialog from "../CustomDialog/CustomDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const CustomDeleteIcon = ({ handleDeleteAgree, styleButton }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        handleAgree={handleDeleteAgree}
      />
      <IconButton style={styleButton} onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default CustomDeleteIcon;
