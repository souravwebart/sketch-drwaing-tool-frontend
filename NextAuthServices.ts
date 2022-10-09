import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const NextAuthOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Sketch-Tool",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email",
        },
        secret: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (credentials && credentials.email && credentials.secret) {
          const Auth = await axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_ENV_VARIABLE + "login",
            data: {
              email: credentials.email,
              password: credentials.secret,
            },
          });
          if (Auth) {
            return {
              email: Auth.data.Email,
              secret: credentials.secret,
              token: Auth.data.token,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, profile, user }) => {
      if (user) {
        token.secret = user.secret;
      }
      return token;
    },
    session: async ({ session, user, token }) => {
      if (session && session.user) {
        session.user.email = token.email;
        session.secret = token.secret;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      baseUrl =
        process.env.BASE_URL || "https://sketch-tools-backend.herokuapp.com/";
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
