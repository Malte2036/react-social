import { Appwrite } from "appwrite";
import { User } from "./data/user";
import { Post } from "./data/post";

export default class AppwriteService {
  postsCollectionId: string;
  appwrite: Appwrite;
  constructor(endpoint: string, projectId: string, postsCollectionId: string) {
    this.appwrite = new Appwrite();

    this.appwrite
      .setEndpoint(endpoint) // Your Appwrite Endpoint
      .setProject(projectId); // Your project ID

    this.postsCollectionId = postsCollectionId;
  }

  async getUser(): Promise<User | null> {
    try {
      return await this.appwrite.account.get<User>();
    } catch (error) {
      return null;
    }
  }

  async createAccount(email: string, username: string, password: string) {
    console.log("createAccount");
    await this.appwrite.account.create(username, email, password, username);
    await this.login(email, password);
  }

  async login(email: string, password: string) {
    console.log("login");
    await this.appwrite.account.createSession(email, password);
  }

  async logout() {
    await this.appwrite.account.deleteSession("current");
  }

  async getAllPosts(): Promise<Post[]> {
    const listDocuments = await this.appwrite.database.listDocuments<Post>(
      this.postsCollectionId
    );
    return listDocuments.documents;
  }

  async createPost(message: string) {
    const user: User | null = await this.getUser();
    if (user === null) {
      console.error("User null on createPost");
      return;
    }

    await this.appwrite.database.createDocument(
      this.postsCollectionId,
      "unique()",
      {
        message: message,
        creator: user.$id,
      },
      ["role:all"]
    );
  }
}
