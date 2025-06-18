import CredentialsProvider from "next-auth/providers/credentials";
import { SigninSchema } from "../validators/auth.validate";
import { prisma } from "../singleton/prisma";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { AuthOptions, Profile, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const parsedData = SigninSchema.safeParse(credentials);

          if (!parsedData.success) {
            throw new Error("Validation Failed");
          }

          const { email, password } = parsedData.data;

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
            select: {
              id: true,
              email: true,
              username: true,
              password: true,
            },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordValid = await compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id,
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          console.error("Authentication error", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: { provider: string } | null;
      profile?: Profile;
    }): Promise<boolean> {
      if (account?.provider === "google" || account?.provider === "github") {
        const email = user.email || profile?.email;

        if (!email) {
          return false;
        }
        try {
          const dbUser = await prisma.user.upsert({
            where: {
              email,
            },
            update: {},
            create: {
              email,
              username: user.name || profile?.name || "",
              password: "",
            },
          });

          user.id = dbUser.id;
          return true;
        } catch (error) {
          console.error("Error while creating user", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
  },
};
