export interface IFilter {
  type?: "deposit" | "withdrawal" | "transfer";
  startDate?: Date;
  endDate?: Date;
}
