import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@repo/db/store";
import { customSession } from "better-auth/plugins";

export const prisma: PrismaClient = new PrismaClient();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.CLIENT_URL as string, "http://192.168.1.5:5000"],
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
