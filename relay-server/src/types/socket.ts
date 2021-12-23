import { Socket } from "socket.io";
import { User } from "@/interfaces/user";

export interface ExtSocket extends Socket {
  auth: User | undefined,
}