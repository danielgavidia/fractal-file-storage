import axios from "axios";
import { withLogging } from "./withLogging";

interface UploadResponse {
  url: string;
}

export const uploadFile = withLogging(
  "uploadFile",
  true,
  async (file: File, userId: string): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post<UploadResponse>(
      `http://localhost:3000/s3/upload/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }
);
