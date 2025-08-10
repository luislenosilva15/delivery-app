import type { TTeamRole, TUser } from "../models";

export interface ErrorResponse {
  response: {
    data: {
      message: string;
      error: string;
      statusCode: number;
    };
  };
}

export interface FetchTeamRequest {
  page: number;
  search: string;
}

export interface FetchTeamSuccess {
  users: TUser[];
  page: number;
  totalPages?: number;
  total: number;
}

export interface FetchTeamResponse {
  users: TUser[];
  total: number;
  totalPages?: number;
  page: number;
}

export interface SetCreateNewTeamRequest {
  teamData: {
    name: string;
    email: string;
    role: TTeamRole;
  };
}

export interface SetCreateNewTeamResponse {
  user: TUser;
}

export interface SetDeleteTeamResponse {
  user: TUser;
}

export interface SetToggleActiveTeamResponse {
  user: TUser;
}

export interface SetChangeTeamPermissionResponse {
  user: TUser;
}

export interface SetChangeTeamPermissionRequest {
  teamId: number;
  permission: TTeamRole;
}

export interface SetChangeTeamPermissionSuccess {
  teamId: number;
  permission: TTeamRole;
}
