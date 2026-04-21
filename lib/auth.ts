import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { User } from "./models/User";
import bcrypt from "bcryptjs";
import connectDB from "./database";
import initialNotes from "@/data.json";
import { importNotesToDB } from "@/app/_actions/note/importNotesToDB";

const credentialProvider = Credentials({
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    const user = await User.findOne({ email: credentials.email as string });
    if (!user) {
      throw new Error("Invalid Credentials");
    } else {
      const correctPassword = await bcrypt.compare(
        credentials.password as string,
        user.password!,
      );
      if (!correctPassword) {
        throw new Error("Invalid Credentials");
      } else {
        return {
          email: user.email,
          id: user._id.toString(),
        };
      }
    }
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [credentialProvider, Google],

  callbacks: {
    signIn: async ({ account, user }) => {
      try {
        await connectDB();
        if (account?.provider === "google") {
          const currentUser = await User.findOne({ email: user.email });
          if (!currentUser) {
            const newUser = new User({
              email: user.email,
            });
            await newUser.save();

            await importNotesToDB(initialNotes.notes, newUser._id.toString());

            user.id = newUser._id.toString();
          } else {
            user.id = currentUser._id.toString();
          }
        }
      } catch (error) {
        console.error(error);
      }
      return true;
    },

    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    session: ({ session, token }) => {
      session.user.id = token.id as string;
      return session;
    },
  },
});
