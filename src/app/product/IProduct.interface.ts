export interface IProduct {
  Id: number;
  SpaceshipOrRobot: number
  Name: string;
  Type: string;
  Price: number;
  Image?:string; // the question mark indicates that its an optional field
}
