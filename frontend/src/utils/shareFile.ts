import axios from "axios";
import { withLogging } from "./withLogging";

export const shareFile = withLogging(
  "shareFie",
  true,
  async (shareUserId: string, fileKey: string, bucket: string, location: string): Promise<File> => {
    const response = await axios.post(`http://localhost:3000/s3/share`, {
      shareUserId,
      fileKey,
      bucket,
      location,
    });

    const data: File = response.data.prismaResponse;
    return data;
  }
);
