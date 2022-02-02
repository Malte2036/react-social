import { User } from "./user";

export type Post = {
  id: string;
  message: string;
  date: number;
  image?:string;
  creator: User;
};
