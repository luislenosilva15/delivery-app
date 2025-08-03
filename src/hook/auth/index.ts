// src/hooks/useAuth.ts
import type { AuthState } from "@/store/features/auth/authSlice";
import { useSelector } from "react-redux";

export const useAuth = () => {
  return useSelector((state: { auth: AuthState }) => state.auth);
};
