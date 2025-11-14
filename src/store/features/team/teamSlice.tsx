/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "./types/models";
import type {
  FetchTeamRequest,
  FetchTeamSuccess,
  SetChangeTeamPermissionRequest,
  SetChangeTeamPermissionSuccess,
  SetCreateNewTeamRequest,
} from "./types/request";

export interface TeamState {
  loading: boolean;
  loadingMore: boolean;
  users: TUser[];
  page: number;
  totalPages?: number;
  total: number;
  hasMore: boolean;
}

const initialState: TeamState = {
  loading: true,
  loadingMore: false,
  users: [],
  page: 1,
  total: 0,
  hasMore: true,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    fetchTeamRequest(state, action: PayloadAction<FetchTeamRequest>) {
      const { page } = action.payload;

      if (page === 1) {
        state.loading = true;
        state.users = [];
        state.hasMore = true;
      } else {
        state.loadingMore = true;
      }

      state.page = page;
    },

    fetchTeamSuccess(state, action: PayloadAction<FetchTeamSuccess>) {
      state.loading = false;
      state.loadingMore = false;
      state.total = action.payload.total;

      const { users, page, totalPages } = action.payload;
      state.page = page;

      if (page === 1) {
        state.users = users;
      } else {
        state.users = [...state.users, ...users];
      }

      state.totalPages = totalPages;
      state.hasMore = totalPages ? page < totalPages : users.length > 0;
    },

    fetchTeamError(state) {
      state.loading = false;
      state.loadingMore = false;
    },

    setCreateNewTeamRequest(
      _state,
      _action: PayloadAction<SetCreateNewTeamRequest>
    ) {},

    setCreateNewTeamSuccess(state) {
      state.loading = true;
      state.loadingMore = false;
      state.users = [];
      state.page = 1;
      state.total = 0;
      state.hasMore = true;
    },

    resetTeam(state) {
      state.loading = true;
      state.loadingMore = false;
      state.users = [];
      state.page = 1;
      state.total = 0;
      state.hasMore = true;
    },

    setDeleteTeamRequest(_state, _action: PayloadAction<{ teamId: number }>) {},

    setDeleteTeamSuccess(state, action: PayloadAction<{ teamId: number }>) {
      state.users = state.users?.filter(
        (user) => user.id !== action.payload.teamId
      );
    },

    setToggleActiveTeamRequest(
      _state,
      _action: PayloadAction<{ teamId: number; isActive: boolean }>
    ) {},

    setToggleActiveTeamSuccess(
      state,
      action: PayloadAction<{ teamId: number; isActive: boolean }>
    ) {
      state.users = state.users?.map((user) => {
        if (user.id === action.payload.teamId) {
          return {
            ...user,
            isActive: action.payload.isActive,
          };
        }
        return user;
      });
    },

    setChangeTeamPermissionRequest(
      _state,
      _action: PayloadAction<SetChangeTeamPermissionRequest>
    ) {},

    setChangeTeamPermissionSuccess(
      state,
      action: PayloadAction<SetChangeTeamPermissionSuccess>
    ) {
      state.users = state.users?.map((user) => {
        if (user.id === action.payload.teamId) {
          return {
            ...user,
            role: action.payload.permission,
          };
        }
        return user;
      });
    },
  },
});

export const {
  fetchTeamError,
  fetchTeamRequest,
  fetchTeamSuccess,
  resetTeam,
  setCreateNewTeamRequest,
  setCreateNewTeamSuccess,
  setDeleteTeamRequest,
  setDeleteTeamSuccess,
  setToggleActiveTeamRequest,
  setToggleActiveTeamSuccess,
  setChangeTeamPermissionRequest,
  setChangeTeamPermissionSuccess,
} = teamSlice.actions;

export default teamSlice.reducer;
