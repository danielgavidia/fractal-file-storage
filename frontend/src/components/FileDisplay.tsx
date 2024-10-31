import type { File } from "@/types/types";
import { useState } from "react";
import ShareFileModal from "./ShareFileModal";
import { shareFile } from "@/utils/shareFile";

interface FileDisplayProps {
  file: File;
  onDownload?: (fileKey: string) => void;
}

export const FileDisplay: React.FC<FileDisplayProps> = ({ file, onDownload }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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

        {/* Action Buttons */}
        {onDownload && (
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onDownload(file.fileKey)}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Download File
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
            >
              Share
            </button>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareFileModal
          onShare={shareFile}
          onClose={() => setIsShareModalOpen(false)}
          fileKey={file.fileKey}
          bucket={file.bucket}
          location={file.location}
        />
      )}
    </div>
  );
};
