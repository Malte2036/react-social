import { io, Socket } from "socket.io-client";

export default class Websocket {
  socket: Socket;
  constructor(url: string, port: number) {
    this.socket = io(`http://${url}:${port}`);

    this.socket.on("connect", () => {
      console.log(this.socket.connected); // x8WIv7-mJelg7on_ALbx
      this.socket.emit("identity", { test: "test" });
      this.socket.emit("createPost", { message: "test" });
    });
    this.socket.on("disconnect", () => {
      console.log(this.socket.connected); // undefined
    });
    this.socket.on("posts", (data) => {
      console.log("posts");
      console.log(data)
    });
    this.socket.on("identity", (data) => {
      console.log("identity");
      console.log(data)
    });
  }
}
