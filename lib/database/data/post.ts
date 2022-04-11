import { PostId } from "./postId";

export type Post = {
  message: string;
  imageId: string | null;
  createdAt: Date | string;
  creatorId: string;
} & PostId;
