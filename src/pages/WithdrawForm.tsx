import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { withdraw } from "../redux/slices/accountSlice";
import { Box, TextField, Button } from "@mui/material";
import ConfirmationModal from "../components/ConfirmationModal";
import SnackbarNotification from "../components/SnackbarNotification";

const WithdrawForm: React.FC = () => {
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

  const handleWithdraw = useCallback(() => {
    if (amount === "" || +amount <= 0) {
      setModalMessage(
        "The withdraw amount should be valid and greater than zero."
      );
      setIsModalOpen(true);
      return;
    }

    dispatch(withdraw(+amount));
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
        label="Withdraw Amount"
        type="number"
        value={amount}
        onChange={handleChange}
        inputProps={{ min: 0 }}
      />
      <Button variant="contained" color="primary" onClick={handleWithdraw}>
        Withdraw
      </Button>

      <ConfirmationModal
        open={isModalOpen}
        title="Invalid Withdraw"
        description={modalMessage}
        handleClose={handleCloseModal}
      />

      <SnackbarNotification
        open={isSnackbarOpen}
        handleClose={handleCloseSnackbar}
        message="Withdraw was successful!"
      />
    </Box>
  );
};

export default WithdrawForm;
