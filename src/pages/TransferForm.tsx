import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { transfer } from "../redux/slices/accountSlice";
import { Box, TextField, Button } from "@mui/material";
import ConfirmationModal from "../components/ConfirmationModal";
import SnackbarNotification from "../components/SnackbarNotification";
import { isIBANValid } from "../utils/utils";

const TransferForm: React.FC = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [toAccount, setToAccount] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAmount(+e.target.value);
    },
    []
  );

  const handleAccount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setToAccount(e.target.value);
    },
    []
  );

  const handleTransfer = useCallback(() => {
    if (+amount <= 0 || toAccount === "") {
      setModalMessage(
        "The transfer amount should be valid. The destination account should not be empty."
      );
      setIsModalOpen(true);
      return;
    }

    if (!isIBANValid(toAccount)) {
      setModalMessage("Invalid IBAN. Please enter a valid IBAN account.");
      setIsModalOpen(true);
      return;
    }

    dispatch(transfer({ amount: +amount, toAccount }));
    setAmount("");
    setToAccount("");
    setIsSnackbarOpen(true);
  }, [amount, toAccount, dispatch]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setIsSnackbarOpen(false);
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
      <TextField
        label="Transfer Amount"
        type="number"
        value={amount}
        onChange={handleChange}
        inputProps={{ min: 0 }}
      />
      <TextField
        label="To Account (IBAN)"
        type="text"
        value={toAccount}
        onChange={handleAccount}
      />
      <Button variant="contained" color="primary" onClick={handleTransfer}>
        Transfer
      </Button>

      <ConfirmationModal
        open={isModalOpen}
        title="Invalid Transfer"
        description={modalMessage}
        handleClose={handleCloseModal}
      />

      <SnackbarNotification
        open={isSnackbarOpen}
        handleClose={handleCloseSnackbar}
        message="Transfer was successful!"
      />
    </Box>
  );
};

export default TransferForm;
