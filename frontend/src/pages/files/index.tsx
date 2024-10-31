import React, { useEffect } from "react";

import { FileDisplay } from "@/components/FileDisplay";
import { getFiles } from "@/utils/getFiles";
import { File } from "@/types/types";
import { downloadFile } from "@/utils/downloadFile";
import AuthGuard from "@/components/AuthGuard";
import useAuth from "@/hooks/useAuth";

const Files = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const { userInfo } = useAuth();

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

  return (
    <AuthGuard>
      <div className="w-full flex flex-col">
        {Array.isArray(files) &&
          files.map((file) => <FileDisplay key={file.id} file={file} onDownload={downloadFile} />)}
      </div>
    </AuthGuard>
  );
};

export default Files;
