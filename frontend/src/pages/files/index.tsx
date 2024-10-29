import React, { useContext, useEffect } from "react";

import { FileDisplay } from "@/components/FileDisplay";
// import { dummyFiles } from "@/utils/dummyData";
import { getFiles } from "@/utils/getFiles";
import { File } from "@/types/types";
import { downloadFile } from "@/utils/downloadFile";
import { AuthContext } from "@/components/AuthProvider";

const Files = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const { userInfo } = useContext(AuthContext) ?? {};

  // Early return if not authenticated
  if (!userInfo?.id) {
    return <div>Please log in to view your files.</div>;
  }

  useEffect(() => {
    const fetchFiles = async () => {
      const userFiles = await getFiles(userInfo.id);
      setFiles(userFiles);
    };

    fetchFiles();
  }, [userInfo.id]); // Add userInfo.id as dependency

  return (
    <div>
      {Array.isArray(files) &&
        files.map((file) => <FileDisplay key={file.id} file={file} onDownload={downloadFile} />)}
    </div>
  );
};

export default Files;
