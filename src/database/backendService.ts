import axios, { AxiosRequestHeaders } from "axios";
import { Account } from "./data/account";
import { AccountPrefs } from "./data/accountPrefs";
import { MyFile } from "./data/myFile";
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
      return { Authorization: `Bearer ${bearerToken}` };
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
      const response = await axios.get(`${this.endpoint}/users`, {
        headers: this.authHeader(),
      });

      if (response.status !== 200) {
        return null;
      }

      return response.data[0];
    } catch (error) {}
    return null;
  }

  async createAccount(email: string, username: string, password: string) {
    const response = await axios.post(`${this.endpoint}/auth/register`, {
      email: email,
      name: username,
      password: password,
    });
    if (response.status !== 201) {
      throw response.statusText;
    }
    this.setBearerToken(response.data.access_token);
  }

  async getAccountPrefs(): Promise<AccountPrefs> {
    const prefs = localStorage.getItem("accountPrefs");
    return prefs ? JSON.parse(prefs) : { darkmode: true };
  }

  async updateAccountPrefs(accountPrefs: AccountPrefs) {
    localStorage.setItem("accountPrefs", JSON.stringify(accountPrefs));
  }

  async login(email: string, password: string) {
    const response = await axios.post(`${this.endpoint}/auth/login`, {
      email: email,
      password: password,
    });
    if (response.status !== 201) {
      throw response.statusText;
    }
    console.log("Logged in!");
    this.setBearerToken(response.data.access_token);
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

      response.data.map((data: any) => {
        data.createdAt = new Date(data.createdAt);
        return data;
      });
      return response.data as Array<Post>;
    } catch (error) {}
    return [];
  }

  async getPostById(postId: string): Promise<Post | null> {
    try {
      const response = await axios.get(`${this.endpoint}/posts/${postId}`, {
        headers: this.authHeader(),
      });

      if (response.status !== 200) {
        return null;
      }
      response.data.createdAt = new Date(response.data.createdAt);

      return response.data as Post;
    } catch (error) {}
    return null;
  }

  async createPost(message: string, image?: File) {
    let imageData = undefined;
    if (image) {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result?.toString() || "");
        reader.onerror = (error) => reject(error);
      });
      imageData = {
        name: image.name,
        data: base64,
        mimeType: image.type,
      };
    }

    await axios.post(
      `${this.endpoint}/posts`,
      {
        message: message,
        image: imageData,
      },
      {
        headers: this.authHeader(),
      }
    );
  }

  async deletePost(postId: string) {
    await axios.delete(`${this.endpoint}/posts/${postId}`, {
      headers: this.authHeader(),
    });
  }

  async getUserById(userId: string): Promise<User | null> {
    try {
      const response = await axios.get(`${this.endpoint}/users/${userId}`, {
        headers: this.authHeader(),
      });

      if (response.status !== 200) {
        return null;
      }
      return response.data as User;
    } catch (error) {}
    return null;
  }

  async setCurrentUserProfilePicture(picture: File) {
    await this.uploadFile(picture);
  }

  async uploadFile(file: File): Promise<MyFile> {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = (error) => reject(error);
    });

    return await axios.post(
      `${this.endpoint}/file`,
      {
        name: file.name,
        data: base64,
        mimeType: file.type,
      },
      {
        headers: this.authHeader(),
      }
    );
  }

  async getFileById(fileId: string): Promise<MyFile | null> {
    try {
      const response = await axios.get(`${this.endpoint}/file/${fileId}`, {
        headers: this.authHeader(),
      });

      console.log(response);

      if (response.status !== 200) {
        return null;
      }
      return response.data as MyFile;
    } catch (error) {}
    return null;
  }
}
