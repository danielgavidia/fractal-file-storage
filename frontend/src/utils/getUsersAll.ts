import axios from "axios";
import type { User } from "@/types/types";
import { withLogging } from "./withLogging";

export const getUsersAll = withLogging("getUsersAll", true, async (): Promise<User[]> => {
  const response = await axios.get("http://localhost:3000/s3/users/all");
  return response.data.users;
});
