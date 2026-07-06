import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAction } from "./actions/auth/login.actions";
import { LoginResponse } from "./types/auth/auth.types";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "safasdfasdfasdfasdf",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        systemType: {},
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const payload = await loginAction({
          systemType:
            credentials?.systemType as LoginResponse["data"]["system_type"],
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!payload?.data?.user) {
          return null;
        }

        return {
          id: String(payload.data.user.id),
          system_type: payload.data.system_type,
          user: {
            ...payload.data.user,
            system_type: payload.data.system_type,
          },
          token: payload.data.token,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token?.user;
      session.accessToken = token?.accessToken;

      return session;
    },
  },
};
