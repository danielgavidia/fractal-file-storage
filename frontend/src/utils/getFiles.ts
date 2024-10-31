import axios from "axios";
import type { File } from "@/types/types";
import { withLogging } from "./withLogging";
import { getAuth } from "firebase/auth";

export const getFiles = withLogging("getFiles", true, async (userId: string): Promise<File[]> => {
  const idToken = await getAuth().currentUser?.getIdToken();
  const response = await axios.post(`http://localhost:3000/s3/files/${userId}`, null, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  const data: File[] = response.data.prismaResponse;
  return data;
});
