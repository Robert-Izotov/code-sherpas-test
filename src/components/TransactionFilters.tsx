import React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

interface TransactionFiltersProps {
  type: string;
  startDate: string;
  endDate: string;
  onTypeChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onClearFilters: () => void;
  sortOrder: "asc" | "desc";
  onSortChange: () => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  type,
  startDate,
  endDate,
  onTypeChange,
  onStartDateChange,
  onEndDateChange,
  onClearFilters,
  sortOrder,
  onSortChange,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, my: 2 }}>
      <TextField
        label="Type"
        select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        variant="outlined"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="deposit">Deposit</MenuItem>
        <MenuItem value="withdrawal">Withdrawal</MenuItem>
        <MenuItem value="transfer">Transfer</MenuItem>
      </TextField>
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
      <Button variant="outlined" color="secondary" onClick={onClearFilters}>
        Clear
      </Button>
    </Box>
  );
};

export default TransactionFilters;
