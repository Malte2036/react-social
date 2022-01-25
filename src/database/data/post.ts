import type { Models } from "appwrite";

export type Post = {
  id: string;
  message: string;
  date: number;
  image: string;
} & Models.Document;
