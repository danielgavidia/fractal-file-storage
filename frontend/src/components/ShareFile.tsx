import { User } from "@/types/types";
import { getUsersAll } from "@/utils/getUsersAll";
import { useEffect, useState } from "react";

interface ShareFileProps {
  onShare: (userId: string) => void;
}

const ShareFile: React.FC<ShareFileProps> = ({ onShare }) => {
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
        {filteredUsers.map((user) => (
          <div key={user.id} className="flex justify-between items-center p-2 border rounded-lg">
            <span>{user.email}</span>
            <button
              onClick={() => onShare(user.id)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Share
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareFile;
