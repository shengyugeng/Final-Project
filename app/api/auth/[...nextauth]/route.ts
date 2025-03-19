//bering in nextauth
import NextAuth from "next-auth";
import { authOptions } from "@/app/authOptions";
//bring your providers

//create a handler from the NextAuth Constructor
const handler = NextAuth(authOptions);
//EXPORT THE HANDLER TO HANDLE BOTH GET AND POST REQUESTS(/api/auth/callback/whatever)
export { handler as GET, handler as POST };

//api/auth/providers
