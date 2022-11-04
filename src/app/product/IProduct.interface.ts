export interface IProduct {
  Id: number;
  Name: string;
  SpaceshipOrRobot: number;
  Price: number;
  Image?:string; // the question mark indicates that its an optional field - Actually do I want this to be optional though?
  Age: number;
  Description: string;
}
