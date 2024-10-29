import prisma from "./client";
import type { File } from "../types";

export async function createFile(fileKey: string): Promise<File> {
  const res: File = await prisma.file.create({
    data: {
      fileKey: fileKey,
    },
  });
  return res;
}

console.log(await createFile("456"));
