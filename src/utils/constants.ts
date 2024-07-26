export type TransactionKey =
  | "date"
  | "type"
  | "amount"
  | "balance"
  | "toAccount";

interface TableHeader {
  label: string;
  key: TransactionKey;
  sortable?: boolean;
}

export const TABLE_HEADERS: TableHeader[] = [
  { label: "Date", key: "date", sortable: true },
  { label: "Type", key: "type", sortable: true },
  { label: "Amount", key: "amount", sortable: true },
  { label: "Balance", key: "balance" },
  { label: "To Account", key: "toAccount" },
];
