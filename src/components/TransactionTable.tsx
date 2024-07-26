import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Typography,
  TableContainer,
  Paper,
} from "@mui/material";
import { ITransaction } from "../types/transaction";
import { TABLE_HEADERS } from "../utils/constants";
import { SortOrder, toggleSortOrder } from "../utils/utils";

interface TransactionTableProps {
  transactions: ITransaction[];
  page: number;
  rowsPerPage: number;
  count: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type TransactionKey = keyof ITransaction;

const renderTransactionValue = (
  transaction: ITransaction,
  key: TransactionKey
) => {
  if (key === "date") {
    return new Date(transaction.date).toLocaleString();
  }

  if (key === "amount") {
    const amount = transaction[key] as number;
    return transaction.type === "withdrawal" ? `-${amount}` : `+${amount}`;
  }

  return transaction[key] || "N/A";
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  page,
  rowsPerPage,
  count,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [sortKey, setSortKey] = useState<TransactionKey>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = useCallback(
    (key: TransactionKey) => {
      if (key === sortKey) {
        setSortOrder(toggleSortOrder(sortOrder));
      } else {
        setSortKey(key);
        setSortOrder("asc");
      }
    },
    [sortKey, sortOrder]
  );

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      if (sortKey === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortKey === "amount") {
        const aAmount = a[sortKey] as number;
        const bAmount = b[sortKey] as number;
        return sortOrder === "asc" ? aAmount - bAmount : bAmount - aAmount;
      }
      return 0;
    });
  }, [transactions, sortKey, sortOrder]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, transactions.length - page * rowsPerPage);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "75vh" }}>
      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEADERS.map((header) => (
                <TableCell
                  key={header.key}
                  onClick={() =>
                    header.sortable && handleSort(header.key as TransactionKey)
                  }
                  sx={{
                    cursor: header.sortable ? "pointer" : "default",
                    textDecoration: header.sortable ? "underline" : "none",
                  }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction: ITransaction) => (
                <TableRow key={transaction.id}>
                  {TABLE_HEADERS.map((header) => (
                    <TableCell key={header.key}>
                      {renderTransactionValue(
                        transaction,
                        header.key as TransactionKey
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {transactions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={TABLE_HEADERS.length}
                  sx={{ textAlign: "center" }}
                >
                  <Typography variant="h6">
                    No transactions have been made.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 &&
              Array.from({ length: emptyRows }).map((_, index) => (
                <TableRow key={`empty-row-${index}`} style={{ height: 53 }}>
                  <TableCell colSpan={TABLE_HEADERS.length} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        style={{ marginTop: "auto" }}
      />
    </Box>
  );
};

export default TransactionTable;
