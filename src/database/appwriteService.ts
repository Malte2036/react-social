import { Appwrite } from "appwrite";
import { Account } from "./data/account";
import { Post } from "./data/post";
import { User } from "./data/user";

export default class AppwriteService {
  postsCollectionId: string;
  usersCollectionId: string;
  appwrite: Appwrite;
  constructor(
    endpoint: string,
    projectId: string,
    postsCollectionId: string,
    usersCollectionId: string
  ) {
    this.appwrite = new Appwrite();

    this.appwrite
      .setEndpoint(endpoint) // Your Appwrite Endpoint
      .setProject(projectId); // Your project ID

    this.postsCollectionId = postsCollectionId;
    this.usersCollectionId = usersCollectionId;
  }

  async getAccount(): Promise<Account | null> {
    try {
      return await this.appwrite.account.get<Account>();
    } catch (error) {
      return null;
    }
  }

  async createAccount(email: string, username: string, password: string) {
    console.log("createAccount");
    await this.appwrite.account.create(username, email, password);
    await this.login(email, password);
    await this.appwrite.database.createDocument(
      this.usersCollectionId,
      username,
      { picture: null },
      ["role:all"]
    );
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
      this.postsCollectionId,
      undefined,
      100
    );
    return listDocuments.documents;
  }

  async createPost(message: string) {
    const account: Account | null = await this.getAccount();
    if (account === null) {
      console.error("Account null on createPost");
      return;
    }

    await this.appwrite.database.createDocument(
      this.postsCollectionId,
      "unique()",
      {
        message: message,
        date: Date.now(),
      },
      ["role:all"]
    );
  }

  async getUserById(userId: string): Promise<User | null> {
    try {
      return await this.appwrite.database.getDocument<User>(
        this.usersCollectionId,
        userId
      );
    } catch (error) {
      return null;
    }
  }

  async setCurrentUserProfilePicture(picture: File) {
    const file = await this.appwrite.storage.createFile("unique()", picture, [
      "role:all",
    ]);
    console.log(file);

    const account = await this.getAccount();
    const user = await this.getUserById(account!.$id);

    user!.picture = file.$id;
    await this.appwrite.database.updateDocument(
      this.usersCollectionId,
      user!.$id,
      user!
    );
  }

  async getFileById(fileId: string) {
    return this.appwrite.storage.getFileView(fileId);
  }
}
