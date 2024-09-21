import NextAuth from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcryptjs from 'bcryptjs';

import prisma from "./lib/prisma"
import { User } from "./interfaces";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parseCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parseCredentials.success) return null

        const { email, password } = parseCredentials.data

        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase()
          }
        })

        if (!user) return null
        if (!bcryptjs.compareSync(password, user.password)) return null

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...rest } = user

        return rest
      }
    })
  ],
  callbacks: {
    // TODO: middlewares for route protection
    // authorized({ auth, request}) {
    //   const isLoggedIn = !!auth?.user

    //   return true
    // },
    jwt({ token, user }) {
      if (user) {
        token.data = user
      }
      return token
    },
    session({ session, token }) {
      //logica para ir a la base de datos y hacer validaciones
      session.user = token.data as User & AdapterUser 
      return session
    },
  }
})