import axios from "axios";
import type { User } from "@/types/types";

export const getUser = async (idToken: string): Promise<User> => {
  console.log("STARTED: FRONTEND: getUser");
  const response = await axios.post("http://localhost:3000/auth/user", null, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  console.log(response.data.prismaResponse);
  console.log("FINISHED: FRONTEND: getUser");
  return response.data.prismaResponse;
};
