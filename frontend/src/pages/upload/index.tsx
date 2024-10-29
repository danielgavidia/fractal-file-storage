import React from "react";
import FileUpload from "@/components/FileUpload";
import { uploadFile } from "@/utils/uploadFile";

const index = () => {
  return (
    <div>
      <FileUpload uploadFile={uploadFile} />
    </div>
  );
};

export default index;
