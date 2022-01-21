import { Appwrite, Models } from "appwrite";
import { User } from "../data/user";

export default class Database {
  appwrite: Appwrite;
  constructor(endpoint: string, projectId: string) {
    this.appwrite = new Appwrite();

    this.appwrite
      .setEndpoint(endpoint) // Your Appwrite Endpoint
      .setProject(projectId); // Your project ID
  }

  async getUser(): Promise<User | null> {
    try {
      const user = await this.appwrite.account.get();
      return { id: user.$id, email: user.email, name: user.name };
    } catch (error) {
      return null;
    }
  }

  async createAccount(email: string, username: string, password: string) {
    console.log("createAccount");
    await this.appwrite.account.create("unique()", email, password, username);
    await this.login(email, password);
  }

  async login(email: string, password: string) {
    console.log("login");
    await this.appwrite.account.createSession(email, password);
  }

  async logout() {
    await this.appwrite.account.deleteSession("current");
  }
}
