import { LucideIcon } from "lucide-react";
import * as icons from "lucide-react";

export const getIconComponents = (iconName: string): LucideIcon => {
  const iconComponents = icons[iconName as keyof typeof icons];
  if (!iconComponents) {
    return icons.HelpCircle;
  }
  return iconComponents as LucideIcon;
};
