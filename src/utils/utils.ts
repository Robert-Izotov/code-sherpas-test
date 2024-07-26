export type SortOrder = "asc" | "desc";

export const toggleSortOrder = (currentSortOrder: SortOrder): SortOrder => {
  return currentSortOrder === "asc" ? "desc" : "asc";
};

export const isIBANValid = (iban: string) => {
  const ibanRegex = /^[A-Z]{2}[0-9A-Z]{15,31}$/;
  return ibanRegex.test(iban);
};

export const createTransaction = (
  type: "deposit" | "withdrawal" | "transfer",
  amount: number,
  balance: number,
  toAccount?: string
): ITransaction => {
  return {
    id: new Date().toISOString(),
    date: new Date(),
    type,
    amount,
    balance,
    toAccount,
  };
};
