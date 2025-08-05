import type { TCompany, TUser } from "../models";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SetEditUserRequest {
  id: number;
  user: {
    name: string | null;
    phone: string | null;
    imageFile: File | null;
    password: string | null;
  };
}

export interface LoginResponse {
  acessToken: string;
  user: TUser;
  company: TCompany;
}

export interface AuthResponse {
  acessToken: string;
  user: TUser;
  company: TCompany;
}

export interface SetEditUserResponse {
  user: TUser;
}
