import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description: string;
  handleClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  description,
  handleClose,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h5" sx={{ textAlign: "center" }}>
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
