import React, { useEffect } from "react";

import { FileDisplay } from "@/components/FileDisplay";
// import { dummyFiles } from "@/utils/dummyData";
import { getFiles } from "@/utils/getFiles";
import { File } from "@/types/types";
import { downloadFile } from "@/utils/downloadFile";

const Files = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      // TODO: Replace hardcoded userId with actual user's ID
      const userFiles = await getFiles("37a4f433-af84-433d-a2c3-4cd054329922");
      setFiles(userFiles);
    };

    fetchFiles();
  }, []);

  return (
    <div>
      {Array.isArray(files) &&
        files.map((file) => <FileDisplay key={file.id} file={file} onDownload={downloadFile} />)}
    </div>
  );
};

export default Files;
