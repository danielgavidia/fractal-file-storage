import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useAuth from "@/hooks/useAuth";

interface FileUploadProps {
  maxSize?: number;
  accept?: string[];
  uploadFile: (File: File, userId: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  maxSize = 5242880,
  accept = ["image/*", ".pdf", ".doc", ".docx"],
  uploadFile,
}) => {
  const { userInfo } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const removeFile = (fileToRemove: File) => {
    setFiles((files) => files.filter((file) => file !== fileToRemove));
  };

  const handleUpload = async () => {
    if (files.length === 0 || !userInfo?.id) return;

    setIsUploading(true);
    await Promise.all(files.map((file) => uploadFile(file, userInfo.id)));
    setFiles([]);
    setIsUploading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
  });

  return (
    <div className="space-y-4 p-4">
      <div
        {...getRootProps()}
        className={`
        p-8 border-[1px] border-dashed rounded-lg cursor-pointer
        transition-all duration-200 ease-in-out
        ${isDragActive ? "" : "hover:text-white hover:bg-black"}
      `}
      >
        <input {...getInputProps()} />
        <div className="text-center hover:text-white">
          <div className="text-4xl mb-4">📁</div>
          <p className="text-lg mb-2">Drag & drop files here, or click to select files</p>
          <p className="text-sm">Supported files: {accept.join(", ")}</p>
          <p className="text-sm ">Max size: {(maxSize / (1024 * 1024)).toFixed(1)}MB</p>
        </div>
      </div>

      {/* File Preview Section */}
      {files.length > 0 && (
        <div className="p-1">
          <h3 className="text-sm font-semibold mb-2">Selected Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 rounded border-[0.5px] border-black"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <span className="text-xs text-gray-400">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file);
                  }}
                  className="text-black hover:text-red-700"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="mt-4 px-4 py-2 bg-black text-white text-sm rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
