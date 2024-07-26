import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarNotificationProps {
  open: boolean;
  handleClose: () => void;
  message: string;
}

const SnackbarNotification: React.FC<SnackbarNotificationProps> = ({
  open,
  handleClose,
  message,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
