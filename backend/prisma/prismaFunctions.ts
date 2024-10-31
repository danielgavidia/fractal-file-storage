import prisma from "./client";
import type { File, User } from "../types";

// Get user
export async function getUserPrisma(firebaseId: string): Promise<User> {
  const res = await prisma.user.findUnique({
    where: {
      firebaseId: firebaseId,
    },
  });

  console.log(res);

  if (!res) {
    throw new Error(
      `User with firebaseId ${firebaseId} not found. Please ensure user is created first.`
    );
  }

  return res;
}

// Create file
export async function createFile(
  userId: string,
  fileKey: string,
  bucket: string,
  location: string
): Promise<File> {
  // First verify the user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found. Cannot create file.`);
  }

  // Then create the file
  const res: File = await prisma.file.upsert({
    where: {
      fileKey: fileKey,
    },
    update: {},
    create: {
      userId: userId,
      fileKey: fileKey,
      bucket: bucket,
      location: location,
    },
  });
  return res;
}

// Retrieve all file keys
export async function getFilesPrisma(userId: string): Promise<File[]> {
  const res: File[] = await prisma.file.findMany({
    where: {
      userId: userId,
    },
  });
  return res;
}
