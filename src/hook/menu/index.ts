import type { MenuState } from "@/store/features/menu/menuSlice";
import { useSelector } from "react-redux";

export const useMenu = () => {
  return useSelector((state: { menu: MenuState }) => state.menu);
};
