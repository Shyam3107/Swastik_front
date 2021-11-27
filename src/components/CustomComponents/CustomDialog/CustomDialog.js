import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default function CustomDialog({
  handleAgree,
  open,
  setOpen,
  remarks,
  setRemarks,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do You Want To Proceed ?
        </DialogContentText>
        {setRemarks && (
          <TextField
            id="standard-basic"
            label="Remarks"
            variant="standard"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleAgree();
            handleClose();
          }}
        >
          Yes
        </Button>
        <Button onClick={handleClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
