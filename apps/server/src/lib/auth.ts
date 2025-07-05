import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import dotenv from "dotenv";
dotenv.config();
import prisma from "@repo/db/store";
import { customSession } from "better-auth/plugins";


export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.CLIENT_URL as string],
  plugins: [
    customSession(async ({ session, user }) => {
      const credits = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          credits: true,
        },
      });
      return {
        user: {
          ...user,
          credits: credits?.credits,
        },
        session,
      };
    }),
  ],
});

export type authType = typeof auth;
