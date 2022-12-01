export interface IProduct {
  id: number;
  name: string;
  spaceshipOrRobot: number;
  price: number;
  image?:string; // the question mark indicates that its an optional field - Actually do I want this to be optional though?
  age: number;
  description: string;
}
