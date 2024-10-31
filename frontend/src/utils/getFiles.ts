import axios from "axios";
import type { File } from "@/types/types";

export const getFiles = async (userId: string): Promise<File[]> => {
  const response = await axios.get(`http://localhost:3000/s3/files/${userId}`);
  return response.data.prismaResponse;
};
