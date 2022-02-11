import { User } from "./user";

export type Post = {
  id: number;
  message: string;
  createdAt: Date;
  imageId: number | null;
  creatorId: number;
};
