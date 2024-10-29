import prisma from "./client";
import type { User } from "../types";

// Login
export const getUserLogin = async (firebaseId: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      firebaseId: firebaseId,
    },
  });
  if (!user) {
    throw new Error("User does not exist");
  }
  return user;
};

// Signup
export const getUserSignup = async (firebaseId: string, email: string): Promise<User> => {
  const userNew = await prisma.user.create({
    data: {
      firebaseId: firebaseId,
      email: email,
    },
  });
  return userNew;
};
