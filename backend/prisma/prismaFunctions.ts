import prisma from "./client";

export async function createFile(fileKey: string) {
  const res = await prisma.file.create({
    data: {
      fileKey: fileKey,
    },
  });
  return res;
}

console.log(await createFile("456"));
