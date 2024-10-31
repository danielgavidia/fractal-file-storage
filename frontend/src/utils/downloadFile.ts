import axios from "axios";
import { withLogging } from "./withLogging";

export const downloadFile = withLogging(
  "downloadFile",
  false,
  async (fileKey: string): Promise<void> => {
    const response = await axios.get(`http://localhost:3000/s3/download/${fileKey}`, {
      responseType: "blob",
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
