import { MyFile } from "./myFile";
import { User } from "./user";

export type Post = {
  id: string;
  message: string;
  date: Date;
  image?: MyFile;
  creator: User;
};
