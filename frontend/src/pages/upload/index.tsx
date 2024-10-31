import React from "react";
import FileUpload from "@/components/FileUpload";
import { uploadFile } from "@/utils/uploadFile";
import AuthGuard from "@/components/AuthGuard";

const index = () => {
  return (
    <AuthGuard>
      <FileUpload uploadFile={uploadFile} />
    </AuthGuard>
  );
};

export default index;
