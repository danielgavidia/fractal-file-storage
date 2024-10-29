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

  useEffect(() => {
    if (!userInfo?.id) {
      return;
    }
    const fetchFiles = async () => {
      const userFiles = await getFiles(userInfo.id);
      setFiles(userFiles);
    };

    fetchFiles();
  }, [userInfo?.id]);

  // Authentication check after hooks
  if (!userInfo?.id) {
    return <div>Please log in to view your files.</div>;
  }

  return (
    <div>
      {Array.isArray(files) &&
        files.map((file) => <FileDisplay key={file.id} file={file} onDownload={downloadFile} />)}
    </div>
  );
};

export default Files;
