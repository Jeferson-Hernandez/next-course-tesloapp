import { DefaultSession } from "next-auth";
import { User } from "@/interfaces";

declare module 'next-auth' {
  interface Session {
    //user is the interface of how we want the object to look
    user: User & DefaultSession['user']
  }
}