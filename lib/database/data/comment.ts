export type Comment = {
  id: string;
  message: string;
  postId: string;
  createdAt: Date | string;
  creatorId: string;
};
