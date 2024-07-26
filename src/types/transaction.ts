export interface ITransaction {
  id: string;
  date: Date;
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  balance: number;
  toAccount?: string;
}

export interface IAccount {
  balance: number;
  transactions: ITransaction[];
}
