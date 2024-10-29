import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onFileSelect?: (files: File[]) => void;
  maxSize?: number;
  accept?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  maxSize = 5242880,
  accept = ["image/*", ".pdf", ".doc", ".docx"],
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
      onFileSelect?.(acceptedFiles);
    },
    [onFileSelect]
  );

  const removeFile = (fileToRemove: File) => {
    setFiles((files) => files.filter((file) => file !== fileToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
        p-8 border-2 border-dashed rounded-lg cursor-pointer
        transition-all duration-200 ease-in-out
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
      `}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="text-4xl mb-4">📁</div>
          <p className="text-lg text-gray-600 mb-2">
            Drag & drop files here, or click to select files
          </p>
          <p className="text-sm text-gray-500">Supported files: {accept.join(", ")}</p>
          <p className="text-sm text-gray-500">
            Max size: {(maxSize / (1024 * 1024)).toFixed(1)}MB
          </p>
        </div>
      </div>

      {/* File Preview Section */}
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
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
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;