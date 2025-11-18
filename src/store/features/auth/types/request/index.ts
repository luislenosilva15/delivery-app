import type { CompanyAboutData } from "@/pages/About/types";
import type {
  TAvailability,
  TCompany,
  TCompanyPayment,
  DeliveryFeeConfig,
  DeliveryFeeType,
  DeliveryFeeTier,
} from "../models";
import type { TUser } from "@/store/features/team/types/models";

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

export interface SetEditUserRequest {
  id: number;
  user: {
    name: string | null;
    phone: string | null;
    imageFile: File | null;
    password: string | null;
  };
}

export interface SetEditCompanyRequest {
  id: number;
  company: CompanyAboutData;
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

export interface SetEditCompanyResponse {
  company: TCompany;
}

export interface SetAlwaysOpenSuccess {
  openingHours: TCompany["openingHours"];
}

export interface SetTemporaryClosedRequest {
  closed: boolean;
}

export interface SetOpeningHoursRequest {
  closed: boolean;
}

export interface SetEditOpeningHoursSuccess {
  openingHours: TCompany["openingHours"];
}

export interface SetEditOpeningHoursRequest {
  schedule: {
    dayOfWeek: number;
    startTime: string | null;
    endTime: string | null;
    closed?: true;
  }[];
}

export interface SetEditDeliverySettingsRequest {
  companyId: number;
  companyPayment: TCompanyPayment;
  availability: TAvailability;
}

export interface SetEditDeliverySettingsSuccess {
  companyId: number;
  companyPayment: TCompanyPayment;
  availability: TAvailability;
}

export interface SetEditDeliverySettingsResponse {
  company: TCompany;
}

// ===== Delivery Fee Update =====
export type UpdateDeliveryFeeFixedPayload = {
  isFree: boolean;
  type: Extract<DeliveryFeeType, "FIXED">;
  fixedFee: number;
};

export type UpdateDeliveryFeeDistancePayload = {
  isFree: boolean;
  type: Extract<DeliveryFeeType, "DISTANCE_BASED">;
  estimatedTime?: number;
  tiers: Array<
    Pick<DeliveryFeeTier, "maxKm" | "price" | "isFree" | "estimatedTime">
  >;
};

export type UpdateDeliveryFeeRequest =
  | UpdateDeliveryFeeFixedPayload
  | UpdateDeliveryFeeDistancePayload;

export interface UpdateDeliveryFeeResponse {
  company: TCompany & { deliveryFee: DeliveryFeeConfig };
}
