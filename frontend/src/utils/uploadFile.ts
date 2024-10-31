import axios from "axios";
import { withLogging } from "./withLogging";
import { getAuth } from "firebase/auth";

interface UploadResponse {
  url: string;
}

export const uploadFile = withLogging(
  "uploadFile",
  true,
  async (file: File, userId: string): Promise<UploadResponse> => {
    const idToken = await getAuth().currentUser?.getIdToken();

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post<UploadResponse>(
      `http://localhost:3000/s3/upload/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data;
  }
);
