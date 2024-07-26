import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../../types/transaction";
import { createTransaction } from "../../utils/utils";

const initialState: IAccount = {
  balance: 0,
  transactions: [],
};

const isIBANValid = (iban: string) => {
  const ibanRegex = /^[A-Z]{2}[0-9A-Z]{15,31}$/;
  return ibanRegex.test(iban);
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action: PayloadAction<number>) => {
      const transaction = createTransaction(
        "deposit",
        action.payload,
        state.balance + action.payload
      );
      state.balance += action.payload;
      state.transactions.unshift(transaction);
    },
    withdraw: (state, action: PayloadAction<number>) => {
      const transaction = createTransaction(
        "withdrawal",
        action.payload,
        state.balance - action.payload
      );
      state.balance -= action.payload;
      state.transactions.unshift(transaction);
    },
    transfer: (
      state,
      action: PayloadAction<{ amount: number; toAccount: string }>
    ) => {
      const { amount, toAccount } = action.payload;
      if (!isIBANValid(toAccount)) {
        console.error("Invalid IBAN");
        return;
      }
      const transaction = createTransaction(
        "transfer",
        amount,
        state.balance - amount,
        toAccount
      );
      state.balance -= amount;
      state.transactions.unshift(transaction);
    },
  },
});

export const { deposit, withdraw, transfer } = accountSlice.actions;
export default accountSlice.reducer;
