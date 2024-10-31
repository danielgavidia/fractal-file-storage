import { User } from "@/types/types";
import { getUsersAll } from "@/utils/getUsersAll";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

interface ShareFileModalProps {
  onShare: (
    shareUserId: string,
    fileKey: string,
    bucket: string,
    location: string
  ) => Promise<File>;
  onClose: () => void;
  fileKey: string;
  bucket: string;
  location: string;
}

const ShareFileModal: React.FC<ShareFileModalProps> = ({
  onShare,
  onClose,
  fileKey,
  bucket,
  location,
}) => {
  // Context
  const { userInfo } = useAuth();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res: User[] = await getUsersAll();
      setUsers(res);
    };
    fetch();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full p-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {filteredUsers.map((user) => {
              if (user.id === userInfo?.id) {
                return <></>;
              } else {
                return (
                  <div
                    key={user.id}
                    className="flex justify-between items-center p-2 border rounded-lg"
                  >
                    <span>{user.email}</span>
                    <button
                      onClick={() => onShare(user.id, fileKey, bucket, location)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Share
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareFileModal;
