export type Post = {
  id: string;
  message: string;
  createdAt: Date | string;
  imageId: string | null;
  creatorId: string;
};
