export interface IProduct {
  Id: number;
  SellRent: number
  Name: string;
  Type: string;
  Price: number;
  Image?:string; // the question mark indicates that its an optional field
}
