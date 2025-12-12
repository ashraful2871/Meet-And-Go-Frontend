import { getDefaultDashboardRoute, UserRole } from "@/service/auth/auth-utils";
import { NavSection } from "@/types/dashboard.interface";

const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["ADMIN", "HOST", "USER"],
        },
        {
          title: "Profile",
          href: "/my-profile",
          icon: "User",
          roles: ["ADMIN", "HOST", "USER"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Lock",
          roles: ["ADMIN", "HOST", "USER"],
        },
      ],
    },
  ];
};

export const commonNavItems: NavSection[] = [];

export const userNavItems: NavSection[] = [
  {
    title: "My Activities",
    items: [
      {
        title: "Booked Events",
        href: "/dashboard/my-booked-events",
        icon: "CalendarCheck",
        roles: ["USER"],
      },
    ],
  },
];

export const hostNavItems: NavSection[] = [
  {
    title: "Host Activities",
    items: [
      {
        title: "Create Events",
        href: "/host/dashboard/create-events",
        icon: "PlusCircle",
        roles: ["HOST"],
      },
      {
        title: "My Events",
        href: "/host/dashboard/my-events",
        icon: "Calendar",
        roles: ["HOST"],
      },
      {
        title: "My Booked Events",
        href: "/host/dashboard/my-booked-events",
        icon: "Users",
        roles: ["HOST"],
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "Hosts Verification",
        href: "/admin/dashboard/hosts-verification",
        icon: "Stethoscope",
        roles: ["ADMIN"],
      },
      {
        title: "Users",
        href: "/admin/dashboard/users-management",
        icon: "Users",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: " Event Management",
    items: [
      {
        title: "Events",
        href: "/admin/dashboard/events-management",
        icon: "CalendarEvent",
        roles: ["ADMIN"],
      },
      {
        title: "Categories",
        href: "/admin/dashboard/category-managements",
        icon: "Tag",
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems: NavSection[] = [...getCommonNavItems(role)];

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "HOST":
      return [...commonNavItems, ...hostNavItems];
    case "USER":
      return [...commonNavItems, ...userNavItems];
    default:
      return [];
  }
};
