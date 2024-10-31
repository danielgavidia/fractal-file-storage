import axios from "axios";
import type { File } from "@/types/types";
import { withLogging } from "./withLogging";

export const getFiles = withLogging("getFiles", true, async (userId: string): Promise<File[]> => {
  const response = await axios.get(`http://localhost:3000/s3/files/${userId}`);
  return response.data.prismaResponse;
});
