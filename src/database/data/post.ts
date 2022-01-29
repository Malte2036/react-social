import type { Models } from "appwrite";

export type Post = {
  id: string;
  message: string;
  date: number;
  image: string;
} & Models.Document;

export function getCreatorByWritePermission(permission: string) {
  return permission.replace("user:", "");
}
