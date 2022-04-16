import axios, { AxiosRequestHeaders } from "axios";
import { Account } from "./data/account";
import { AccountPrefs } from "./data/accountPrefs";
import { Comment } from "./data/comment";
import { MyFile } from "./data/myFile";
import { Post } from "./data/post";
import { PostId } from "./data/postId";
import { User } from "./data/user";

export default class BackendService {
  endpoint: string;
  constructor(url: string, port: number) {
    this.endpoint = `${url}:${port}`;
  }

  authHeader(bearerToken: string): AxiosRequestHeaders | {} {
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
  }

  async getAllPostIds(bearerToken: string): Promise<PostId[]> {
    const response = await axios.get(`${this.endpoint}/posts/id`, {
      headers: this.authHeader(bearerToken),
    });

    if (response.status !== 200) {
      return [];
    }

    response.data.map((data: any) => {
      data.createdAt = new Date(data.createdAt);
      return data;
    });
    return response.data as Array<PostId>;
  }

  async getAllPostsByCreatorId(
    creatorId: string,
    bearerToken: string
  ): Promise<Post[]> {
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
  }

  async getAllPostIdsByCreatorId(
    creatorId: string,
    bearerToken: string
  ): Promise<PostId[]> {
    const response = await axios.get(
      `${this.endpoint}/posts/byCreatorId/${creatorId}/id`,
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
    return response.data as Array<PostId>;
  }

  async getPostById(postId: string, bearerToken: string): Promise<Post | null> {
    const response = await axios.get(`${this.endpoint}/posts/${postId}`, {
      headers: this.authHeader(bearerToken),
    });

    if (response.status !== 200) {
      return null;
    }
    response.data.createdAt = new Date(response.data.createdAt);

    return response.data as Post;
  }

  async getLikesCountByPostId(
    postId: string,
    bearerToken: string
  ): Promise<number> {
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
  }

  async createLikeByPostId(postId: string, bearerToken: string) {
    await axios.post(
      `${this.endpoint}/posts/${postId}/likes`,
      {},
      {
        headers: this.authHeader(bearerToken),
      }
    );
  }

  async deleteLikeByPostId(postId: string, bearerToken: string) {
    await axios.delete(`${this.endpoint}/posts/${postId}/likes`, {
      headers: this.authHeader(bearerToken),
    });
  }

  async isPostLikedByMe(postId: string, bearerToken: string): Promise<boolean> {
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
  }

  async getCommentsByPostId(
    postId: string,
    bearerToken: string
  ): Promise<Comment[]> {
    const response = await axios.get(
      `${this.endpoint}/posts/${postId}/comments`,
      {
        headers: this.authHeader(bearerToken),
      }
    );

    if (response.status !== 200) {
      return [];
    }
    return response.data as Comment[];
  }

  async createPost(
    message: string,
    image: File | undefined,
    bearerToken: string
  ) {
    const formData = new FormData();
    formData.append("message", message);

    if (image) {
      formData.append("image", image);
    }

    await axios.post(`${this.endpoint}/posts`, formData, {
      headers: {
        ...this.authHeader(bearerToken),
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async deletePost(postId: string, bearerToken: string) {
    await axios.delete(`${this.endpoint}/posts/${postId}`, {
      headers: this.authHeader(bearerToken),
    });
  }

  async getUserById(userId: string, bearerToken: string): Promise<User | null> {
    const response = await axios.get(`${this.endpoint}/users/${userId}`, {
      headers: this.authHeader(bearerToken),
    });

    if (response.status !== 200) {
      return null;
    }
    return response.data as User;
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
    fileId: string,
    bearerToken: string
  ): Promise<MyFile | null> {
    if (!fileId) {
      return null;
    }
    const response = await axios.get(`${this.endpoint}/files/${fileId}`, {
      headers: this.authHeader(bearerToken),
    });

    if (response.status !== 200) {
      return null;
    }
    return response.data as MyFile;
  }

  getFileUrlById(imageId: string) {
    return `${this.endpoint}/files/${imageId}`;
  }
}
