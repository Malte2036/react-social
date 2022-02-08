import { io, Socket } from "socket.io-client";

export default class Websocket {
  socket: Socket;
  constructor(url: string, port: number) {
    this.socket = io(`http://${url}:${port}`);

    this.socket.on("connect", () => {
      console.log(this.socket.connected); // x8WIv7-mJelg7on_ALbx
      this.socket.emit("events", { test: "test" });
    });
    this.socket.on("disconnect", () => {
      console.log(this.socket.connected); // undefined
    });
    this.socket.on("data", () => {
      console.log("data");
    });
  }
}
