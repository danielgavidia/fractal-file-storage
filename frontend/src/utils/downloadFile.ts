import axios from "axios";
import { withLogging } from "./withLogging";
import { getAuth } from "firebase/auth";

export const downloadFile = withLogging(
  "downloadFile",
  false,
  async (fileKey: string): Promise<void> => {
    const idToken = await getAuth().currentUser?.getIdToken();
    const response = await axios.post(`http://localhost:3000/s3/download/${fileKey}`, null, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    // Create a blob URL from the response data
    const blob = new Blob([response.data], { type: response.data.type });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = fileKey; // Use the fileKey as the download filename

    // Append to body, click, and cleanup
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
);
