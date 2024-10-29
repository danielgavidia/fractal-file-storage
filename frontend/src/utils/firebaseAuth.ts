import axios from "axios";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";
import type { User } from "@/types/types";

export async function firebaseAuth(): Promise<User> {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken();

  console.log(`firebaseAuth idToken: ${idToken}`);

  const res = await axios.post(`http://localhost:3000/auth/login`, null, {
    headers: { Authorization: `Bearer ${idToken}` },
  });

  const data: User = res.data;
  return data;
}
