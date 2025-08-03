// routes/PrivateRoutes.tsx
import PageLoading from "@/components/PageLoading";
import {
  setAuthValidRequest,
  type AuthState,
} from "@/store/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const { autenticated, loading } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthValidRequest());
  }, [dispatch]);

  if (loading) return <PageLoading />;

  return autenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
