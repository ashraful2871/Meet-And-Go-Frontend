export type UserRole = "ADMIN" | "USER" | "HOST";

export const getDefaultDashboardRoute = (role?: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "HOST") {
    return "/host/dashboard";
  }
  if (role === "USER") {
    return "/dashboard";
  }
  return "/";
};
