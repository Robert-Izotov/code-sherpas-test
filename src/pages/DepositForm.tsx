import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { deposit } from "../redux/slices/accountSlice";
import { Box, TextField, Button } from "@mui/material";
import ConfirmationModal from "../components/ConfirmationModal";
import SnackbarNotification from "../components/SnackbarNotification";

const DepositForm: React.FC = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAmount(e.target.value);
    },
    []
  );

  const handleDeposit = useCallback(() => {
    if (amount === "" || +amount <= 0) {
      setModalMessage(
        "The deposit amount should be valid and greater than zero."
      );
      setIsModalOpen(true);
      return;
    }

    dispatch(deposit(+amount));
    setAmount("");
    setIsSnackbarOpen(true);
  }, [amount, dispatch]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setIsSnackbarOpen(false);
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
      <TextField
        label="Deposit Amount"
        type="number"
        value={amount}
        onChange={handleChange}
        inputProps={{ min: 0 }}
      />
      <Button variant="contained" color="primary" onClick={handleDeposit}>
        Deposit
      </Button>

      <ConfirmationModal
        open={isModalOpen}
        title="Invalid Deposit"
        description={modalMessage}
        handleClose={handleCloseModal}
      />

      <SnackbarNotification
        open={isSnackbarOpen}
        handleClose={handleCloseSnackbar}
        message="Deposit was successful!"
      />
    </Box>
  );
};

export default DepositForm;
