import { Models } from "appwrite";
import * as https from "https";
import { Account } from "./data/account";
import { AccountPrefs } from "./data/accountPrefs";
import { Post } from "./data/post";
import { User } from "./data/user";

export default class BackendService {
  url: string;
  port: number;
  constructor(url: string, port: number) {
    this.url = url;
    this.port = port;
  }
  async getAccount(): Promise<Account | null> {
    return null;
  }

  async createAccount(email: string, username: string, password: string) {
  }

  async getAccountPrefs(): Promise<AccountPrefs> {
    return { darkmode: true };
  }

  async updateAccountPrefs(accountPrefs: AccountPrefs) {}

  async login(email: string, password: string) {}

  async logout() {}

  async getAllPosts(): Promise<Post[]> {
    return [];
  }

  async getPostById(postId: string): Promise<Post | null> {
    return null;
  }

  async createPost(message: string, image?: string) {}

  async deletePost(postId: string) {}

  async getUserById(userId: string): Promise<User | null> {
    return null;
  }

  async setCurrentUserProfilePicture(picture: File) {}

  async uploadFile(file: File): Promise<Models.File> {
    return await this.getFileById("");
  }

  async getFileById(fileId: string) {
    return {
      $id: "empty",
      $read: [],
      $write: [],
      name: "empty",
      dateCreated: 0,
      signature: "empty",
      mimeType: "",
      sizeOriginal: 10,
    };
  }
}
