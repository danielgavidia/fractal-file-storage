import prisma from "./client";
import type { User } from "../types";
import { withLogging } from "../utils/withLogging";

// Login / Signup
export const getOrCreateUser = withLogging(
  "getOrCreateUser",
  true,
  async (firebaseId: string, email: string): Promise<User> => {
    const user: User = await prisma.user.upsert({
      where: {
        firebaseId: firebaseId,
      },
      update: {}, // No updates needed if user exists
      create: {
        firebaseId: firebaseId,
        email: email,
      },
    });
    return user;
  }
);
