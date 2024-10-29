import prisma from "./client";
import type { User } from "../types";

// Login / Signup
export const getOrCreateUser = async (firebaseId: string, email: string): Promise<User> => {
  const user = await prisma.user.upsert({
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
};
