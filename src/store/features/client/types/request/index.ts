import type { TCompany } from "@/store/features/auth/types/models";
import type { TGroup } from "@/store/features/menu/types/models";

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
