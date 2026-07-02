import type { IconType } from "react-icons";
import {
  LuShoppingBag,
  LuTruck,
  LuLandmark,
  LuStethoscope,
  LuFactory,
  LuShieldCheck,
} from "react-icons/lu";

// Slug → lucide icon, shared by the industries pages and navbar.
export const sectorIcons: Record<string, IconType> = {
  retail: LuShoppingBag,
  logistics: LuTruck,
  banking: LuLandmark,
  healthcare: LuStethoscope,
  manufacturing: LuFactory,
  insurance: LuShieldCheck,
};
