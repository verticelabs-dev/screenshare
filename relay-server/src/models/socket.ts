import { Socket } from "socket.io";
import { User } from "./user";

export interface ExtSocket extends Socket {
  auth: User | undefined,
}