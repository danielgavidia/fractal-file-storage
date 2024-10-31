import axios from "axios";
import { withLogging } from "./withLogging";
import { getAuth } from "firebase/auth";

export const shareFile = withLogging(
  "shareFie",
  true,
  async (shareUserId: string, fileKey: string, bucket: string, location: string): Promise<File> => {
    const idToken = await getAuth().currentUser?.getIdToken();

    const response = await axios.post(
      `http://localhost:3000/s3/share`,
      {
        shareUserId,
        fileKey,
        bucket,
        location,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const data: File = response.data.prismaResponse;
    return data;
  }
);
