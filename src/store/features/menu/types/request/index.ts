import type { FormData } from "@/components/Modals/Product/Create/types";
import type { TGroup, TProduct } from "../models";

import type { FormData as GroupFormData } from "@/components/Modals/Group/Create/types";

export interface FetchGroupsResponse {
  menuGroups: TGroup[];
}

export interface FetchGroupsSuccess {
  groups: TGroup[];
}

export interface FetchProductsRequest {
  groupId: number;
}

export interface FetchProductsResponse {
  products: TProduct[];
}

export interface FetchProductsSuccess {
  products: TProduct[];
}

export interface SetCreateNewProductRequest {
  product: FormData;
  menuGroupId: number;
}
export interface SetCreateNewProductResponse {
  product: TProduct;
}

export interface SetCreateNewProductSuccess {
  product: TProduct;
}

export interface SetToggleDisableGroupRequest {
  groupId: number;
  disabled: boolean;
}

export interface SetToggleDisableGroupResponse {
  group: TGroup;
}

export interface SetToggleDisableGroupSuccess {
  groupId: number;
  disabled: boolean;
}

export interface SetDeleteGroupRequest {
  groupId: number;
}

export interface SetDeleteGroupResponse {
  group: TGroup;
}

export interface SetDeleteGroupSuccess {
  groupId: number;
}

export interface SetCreateNewGroupRequest {
  group: GroupFormData;
  menuId: number;
}

export interface SetCreateNewGroupResponse {
  group: TGroup;
}

export interface SetCreateNewGroupSuccess {
  group: TGroup;
}
