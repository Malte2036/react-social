import { MyFile } from "./myFile";
import { User } from "./user";

export type Post = {
  id: string;
  message: string;
  date: number;
  image?: MyFile;
  creator: User;
};
