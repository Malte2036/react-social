import { Models } from "appwrite";
import axios, { AxiosRequestHeaders } from "axios";
import { Account } from "./data/account";
import { AccountPrefs } from "./data/accountPrefs";
import { Post } from "./data/post";
import { User } from "./data/user";

export default class BackendService {
  endpoint: string;
  constructor(url: string, port: number) {
    this.endpoint = `http://${url}:${port}`;
  }

  authHeader(): AxiosRequestHeaders | undefined {
    const bearerToken = this.getBearerToken();
    if (bearerToken) {
      return { "x-auth-token": `Bearer ${bearerToken}` };
    } else {
      return {};
    }
  }

  getBearerToken(): string | null {
    return localStorage.getItem("bearerToken") ?? null;
  }

  setBearerToken(bearerToken: string | null) {
    if (bearerToken) {
      localStorage.setItem("bearerToken", bearerToken);
    } else {
      localStorage.removeItem("bearerToken");
    }
  }

  async getAccount(): Promise<Account | null> {
    try {
      const response = await axios.get(`${this.endpoint}/user`, {
        headers: this.authHeader(),
      });

      if (response.status !== 200) {
        return null;
      }

      return response.data;
    } catch (error) {}
    return null;
  }

  async createAccount(email: string, username: string, password: string) {
    await axios.post(`${this.endpoint}/auth/register`, {
      email: email,
      name: username,
      password: password,
    });
    await this.login(email, password);
  }

  async getAccountPrefs(): Promise<AccountPrefs> {
    return { darkmode: true };
  }

  async updateAccountPrefs(accountPrefs: AccountPrefs) {}

  async login(email: string, password: string) {
    const response = await axios.post(`${this.endpoint}/auth/login`, {
      email: email,
      password: password,
    });
    if (response.status !== 200) {
      throw response.statusText;
    }
    console.log(`Logged in as ${response.data.user.name}`);
    this.setBearerToken(response.data.token);
  }

  async logout() {
    this.setBearerToken(null);
  }

  async getAllPosts(): Promise<Post[]> {
    
    try {
      const response = await axios.get(`${this.endpoint}/posts`, {
        headers: this.authHeader(),
      });

      if (response.status !== 200) {
        return [];
      }

      return response.data;
    } catch (error) {}
    return [];
  }

  async getPostById(postId: string): Promise<Post | null> {
    return null;
  }

  async createPost(message: string, image?: string) {}

  async deletePost(postId: string) {}

  async getUserById(userId: string): Promise<User | null> {
    try {
      const response = await axios.get(`${this.endpoint}/user/${userId}`, {
        headers: this.authHeader(),
      });

      if (response.status !== 200) {
        return null;
      }
      return response.data as User;
    } catch (error) {}
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
