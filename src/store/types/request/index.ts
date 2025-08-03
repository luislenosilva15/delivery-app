import type { TCompany, TUser } from "../models";

export interface LoginRequest {
  email: string;
  password: string;
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
