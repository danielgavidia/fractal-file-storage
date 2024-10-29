import prisma from "./client";
import type { File } from "../types";

// Create file
export async function createFile(fileKey: string, bucket: string, location: string): Promise<File> {
  const res: File = await prisma.file.upsert({
    where: {
      fileKey: fileKey,
    },
    update: {},
    create: {
      fileKey: fileKey,
      bucket: bucket,
      location: location,
    },
  });
  return res;
}

// Retrieve all file keys
export async function getFilesPrisma(): Promise<File[]> {
  const res: File[] = await prisma.file.findMany({});
  return res;
}
