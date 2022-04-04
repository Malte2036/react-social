import axios, { AxiosRequestHeaders } from "axios";
import { Account } from "./data/account";
import { AccountPrefs } from "./data/accountPrefs";
import { MyFile } from "./data/myFile";
import { Post } from "./data/post";
import { User } from "./data/user";

export default class BackendService {
  endpoint: string;
  constructor(url: string, port: number) {
    this.endpoint = `${url}:${port}`;
  }

  authHeader(bearerToken: string): AxiosRequestHeaders | undefined {
    if (bearerToken) {
      return { Authorization: `Bearer ${bearerToken}` };
    } else {
      return {};
    }
  }

  async getAccount(bearerToken: string): Promise<Account | null> {
    try {
      const response = await axios.get(`${this.endpoint}/users/account`, {
        headers: this.authHeader(bearerToken),
      });

      if (response.status !== 200) {
        return null;
      }

      return response.data;
    } catch (error) {}
    return null;
  }

  async createAccount(
    email: string,
    username: string,
    password: string
  ): Promise<string> {
    const response = await axios.post(`${this.endpoint}/auth/register`, {
      email: email,
      name: username,
      password: password,
    });
    if (response.status !== 201) {
      throw response.statusText;
    }
    return response.data.access_token;
  }

  async getAccountPrefs(): Promise<AccountPrefs> {
    return { darkmode: true };
    /*const prefs = localStorage.getItem("accountPrefs");
    return prefs ? JSON.parse(prefs) : { darkmode: true };*/
  }

  async updateAccountPrefs(accountPrefs: AccountPrefs) {
    localStorage.setItem("accountPrefs", JSON.stringify(accountPrefs));
  }

  async login(email: string, password: string): Promise<string> {
    const response = await axios.post(`${this.endpoint}/auth/login`, {
      email: email,
      password: password,
    });
    if (response.status !== 201) {
      throw response.statusText;
    }
    console.log("Logged in!");
    return response.data.access_token;
  }

  async getAllPosts(bearerToken: string): Promise<Post[]> {
    try {
      const response = await axios.get(`${this.endpoint}/posts`, {
        headers: this.authHeader(bearerToken),
      });

      if (response.status !== 200) {
        return [];
      }

      response.data.map((data: any) => {
        data.createdAt = new Date(data.createdAt);
        return data;
      });
      return response.data as Array<Post>;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  async getAllPostsByCreatorId(
    creatorId: string,
    bearerToken: string
  ): Promise<Post[]> {
    try {
      const response = await axios.get(
        `${this.endpoint}/posts/byCreatorId/${creatorId}`,
        {
          headers: this.authHeader(bearerToken),
        }
      );

      if (response.status !== 200) {
        return [];
      }

      response.data.map((data: any) => {
        data.createdAt = new Date(data.createdAt);
        return data;
      });
      return response.data as Array<Post>;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  async getPostById(postId: string, bearerToken: string): Promise<Post | null> {
    try {
      const response = await axios.get(`${this.endpoint}/posts/${postId}`, {
        headers: this.authHeader(bearerToken),
      });

      if (response.status !== 200) {
        return null;
      }
      response.data.createdAt = new Date(response.data.createdAt);

      return response.data as Post;
    } catch (error) {}
    return null;
  }

  async getLikesCountByPostId(
    postId: number,
    bearerToken: string
  ): Promise<number> {
    try {
      const response = await axios.get(
        `${this.endpoint}/posts/${postId}/likes/count`,
        {
          headers: this.authHeader(bearerToken),
        }
      );

      if (response.status !== 200) {
        return 0;
      }
      return response.data as number;
    } catch (error) {}
    return null;
  }

  async createLikeByPostId(postId: number, bearerToken: string) {
    await axios.post(
      `${this.endpoint}/posts/${postId}/likes`,
      {},
      {
        headers: this.authHeader(bearerToken),
      }
    );
  }

  async deleteLikeByPostId(postId: number, bearerToken: string) {
    await axios.delete(`${this.endpoint}/posts/${postId}/likes`, {
      headers: this.authHeader(bearerToken),
    });
  }

  async isPostLikedByMe(postId: number, bearerToken: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${this.endpoint}/posts/${postId}/likes/me`,
        {
          headers: this.authHeader(bearerToken),
        }
      );

      if (response.status !== 200) {
        return false;
      }
      return response.data as boolean;
    } catch (error) {}
    return false;
  }

  async createPost(
    message: string,
    image: File | undefined,
    bearerToken: string
  ) {
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
        headers: this.authHeader(bearerToken),
      }
    );
  }

  async deletePost(postId: number, bearerToken: string) {
    await axios.delete(`${this.endpoint}/posts/${postId}`, {
      headers: this.authHeader(bearerToken),
    });
  }

  async getUserById(userId: number, bearerToken: string): Promise<User | null> {
    try {
      const response = await axios.get(`${this.endpoint}/users/${userId}`, {
        headers: this.authHeader(bearerToken),
      });

      if (response.status !== 200) {
        return null;
      }
      return response.data as User;
    } catch (error) {}
    return null;
  }

  async setCurrentUserProfilePicture(picture: File, bearerToken: string) {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(picture);
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = (error) => reject(error);
    });
    return await axios.post(
      `${this.endpoint}/users/image`,
      {
        name: picture.name,
        data: base64,
        mimeType: picture.type,
      },
      {
        headers: this.authHeader(bearerToken),
      }
    );
  }

  async getFileById(
    fileId: number,
    bearerToken: string
  ): Promise<MyFile | null> {
    if (!fileId) {
      return null;
    }
    try {
      const response = await axios.get(`${this.endpoint}/files/${fileId}`, {
        headers: this.authHeader(bearerToken),
      });

      if (response.status !== 200) {
        return null;
      }
      return response.data as MyFile;
    } catch (error) {}
    return null;
  }
}
