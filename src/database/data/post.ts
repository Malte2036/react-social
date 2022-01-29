import type { Models } from "appwrite";

export type Post = {
  message: string;
  date: number;
  image: string;
} & Models.Document;

export function getCreatorByWritePermission(permission: string) {
  return permission.replace("user:", "");
}
