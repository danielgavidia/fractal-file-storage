import type { File } from "@/types/types";

interface FileDisplayProps {
  file: File;
  onDownload?: (fileKey: string) => void;
}

export const FileDisplay: React.FC<FileDisplayProps> = ({ file, onDownload }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="space-y-2">
        {/* File Key */}
        <div className="flex items-center">
          <span className="text-gray-500 text-sm w-24">File Key:</span>
          <span className="font-medium truncate">{file.fileKey}</span>
        </div>

        {/* Created At */}
        <div className="flex items-center">
          <span className="text-gray-500 text-sm w-24">Created:</span>
          <span className="text-sm text-gray-600">{new Date(file.createdAt).toLocaleString()}</span>
        </div>

        {/* Updated At */}
        <div className="flex items-center">
          <span className="text-gray-500 text-sm w-24">Updated:</span>
          <span className="text-sm text-gray-600">{new Date(file.updatedAt).toLocaleString()}</span>
        </div>

        {/* Download Button */}
        {onDownload && (
          <div className="mt-4">
            <button
              onClick={() => onDownload(file.fileKey)}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Download File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};