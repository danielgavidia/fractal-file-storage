import prisma from "./client";
import type { File } from "../types";

export async function createFile(fileKey: string): Promise<File> {
  console.log(fileKey);
  const res: File = await prisma.file.upsert({
    where: {
      fileKey: fileKey,
    },
    update: {},
    create: {
      fileKey: fileKey,
    },
  });
  return res;
}
