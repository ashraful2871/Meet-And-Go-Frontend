export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT";

export const getDefaultDashboardRoute = (role?: UserRole): string => {
  //   if (role === "ADMIN") {
  //     return "/admin/dashboard";
  //   }
  //   if (role === "DOCTOR") {
  //     return "/doctor/dashboard";
  //   }
  //   if (role === "PATIENT") {
  //     return "/dashboard";
  //   }
  return "/";
};
