import type { TCompany } from "@/store/features/auth/types/models";
import type { TGroup } from "@/store/features/menu/types/models";
import type { TCartItem } from "../models";

export interface FetchCompanyRequest {
  id: number;
}

export interface FetchCompanyResponse {
  company: TCompany;
}

export interface FetchCompanySuccess {
  company: TCompany;
}

export interface FetchGroupsRequest {
  menuId: number;
}

export interface FetchGroupsResponse {
  groups: TGroup[];
}

export interface FetchGroupsSuccess {
  groups: TGroup[];
}

export interface SetAddToCartRequest {
  item: TCartItem;
}

export interface SetAddToCartSuccess {
  item: TCartItem;
}

export interface FetchCartSuccess {
  items: TCartItem[];
}

export interface SetChangeQuantityRequest {
  uniqueId: string;
  quantity: number;
}

export interface SetChangeQuantitySuccess {
  uniqueId: string;
  quantity: number;
}
