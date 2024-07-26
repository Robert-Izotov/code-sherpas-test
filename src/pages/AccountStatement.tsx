import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ITransaction } from "../types/transaction";
import { RootState } from "../redux/store";
import { Box } from "@mui/material";
import TransactionFilters from "../components/TransactionFilters";
import TransactionTable from "../components/TransactionTable";
import { toggleSortOrder, SortOrder } from "../utils/utils";

const AccountStatement: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [type, setType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const transactions = useSelector(
    (state: RootState) => state.account.transactions
  );

  const handleChangePage = (_: unknown, newPage: number): void =>
    setPage(newPage);

  const handleClearFilters = (): void => {
    setType("");
    setStartDate("");
    setEndDate("");
  };

  const handleSort = (): void => setSortOrder(toggleSortOrder(sortOrder));

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction: ITransaction) => {
        const matchesType = !type || transaction.type === type;
        const startMatches =
          !startDate || new Date(transaction.date) >= new Date(startDate);
        const endMatches =
          !endDate || new Date(transaction.date) <= new Date(endDate);
        return matchesType && startMatches && endMatches;
      }),
    [transactions, type, startDate, endDate]
  );

  const sortedTransactions = useMemo(
    () =>
      filteredTransactions.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [filteredTransactions, sortOrder]
  );

  return (
    <Box sx={{}}>
      <TransactionFilters
        type={type}
        startDate={startDate}
        endDate={endDate}
        onTypeChange={setType}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onClearFilters={handleClearFilters}
        onSortChange={handleSort}
        sortOrder={sortOrder}
      />
      <TransactionTable
        transactions={sortedTransactions}
        page={page}
        rowsPerPage={10}
        count={sortedTransactions.length}
        onPageChange={handleChangePage}
      />
    </Box>
  );
};

export default AccountStatement;
