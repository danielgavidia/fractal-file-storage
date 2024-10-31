import axios from "axios";
import type { User } from "@/types/types";
import { withLogging } from "./withLogging";
import { getAuth } from "firebase/auth";

export const getUser = withLogging("getUsers", true, async (): Promise<User> => {
  const idToken = await getAuth().currentUser?.getIdToken();
  const response = await axios.post("http://localhost:3000/auth/user", null, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  const data: User = response.data.prismaResponse;
  return data;
});
