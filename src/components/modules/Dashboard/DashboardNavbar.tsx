import { getNavItemsByRole } from "@/lib/navItems.config";
import { getDefaultDashboardRoute } from "@/service/auth/auth-utils";
import { getUserInfo } from "@/service/auth/getUserIfo";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);
  return (
    <div>
      <DashboardNavbarContent
        userInfo={userInfo}
        navItems={navItems}
        dashboardHome={dashboardHome}
      />
    </div>
  );
};

export default DashboardNavbar;
