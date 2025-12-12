import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Menu,
  User,
  LayoutDashboard,
  Calendar,
  Settings,
  LogOut,
  Shield,
  Users,
  Tag,
} from "lucide-react";
import { getCookie } from "@/service/auth/cookiesHandler";
import LogoutButton from "./LogoutButton";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@/service/auth/auth-utils";

interface DecodedToken extends JwtPayload {
  role: UserRole;
  email: string;
  name?: string;
}

const PublicNavbar = async () => {
  // Get user info from token
  const accessToken = await getCookie("accessToken");
  let userRole: UserRole = "GUEST";
  let userEmail = "";
  let userName = "";

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      ) as DecodedToken;
      userRole = decoded.role;
      userEmail = decoded.email;
      userName = decoded.name || decoded.email.split("@")[0];
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Define navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { label: "Home", href: "/" },
      { label: "Events", href: "/events" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ];

    // Add role-specific items
    if (userRole === "ADMIN") {
      return [...baseItems, { label: "Admin Panel", href: "/dashboard/admin" }];
    }

    return baseItems;
  };

  // Define dashboard routes based on role
  const getDashboardRoute = () => {
    switch (userRole) {
      case "ADMIN":
        return "/dashboard/admin";
      case "HOST":
        return "/dashboard/host";
      case "USER":
        return "/dashboard/user";
      default:
        return "/login";
    }
  };

  const navItems = getNavItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center justify-center text-xl font-bold text-primary transition-colors hover:text-primary/80"
        >
          <Calendar className="mr-2 h-6 w-6" />
          Meet & Go
        </Link>

        {/* Center: Nav Items (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: User Menu or Login (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {accessToken && userRole !== "GUEST" ? (
            <>
              {/* Dashboard Link */}
              <Button variant="outline" asChild>
                <Link href={getDashboardRoute()}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>

              {/* User Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={userName} />
                      <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Role-specific menu items */}
                  {userRole === "ADMIN" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/admin">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/admin/host-verifications">
                          <Users className="mr-2 h-4 w-4" />
                          Host Verifications
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/admin/categories">
                          <Tag className="mr-2 h-4 w-4" />
                          Categories
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {userRole === "HOST" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/host">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Host Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/host/events">
                          <Calendar className="mr-2 h-4 w-4" />
                          My Events
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/host/booked-events">
                          <Users className="mr-2 h-4 w-4" />
                          Booked Events
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/host/events/create">
                          <Calendar className="mr-2 h-4 w-4" />
                          Create Event
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {userRole === "USER" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/user">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          My Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/user/bookings">
                          <Calendar className="mr-2 h-4 w-4" />
                          My Bookings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {/* Common menu items */}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/change-password">
                      <Settings className="mr-2 h-4 w-4" />
                      Change Password
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <div className="w-full">
                      <LogoutButton />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-6">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              </SheetHeader>

              {/* User Info (Mobile) */}
              {accessToken && userRole !== "GUEST" && (
                <div className="mt-4 flex items-center gap-3 rounded-lg border p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium">{userName}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {userEmail}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="mt-6 space-y-2">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}

                {/* Role-specific mobile links */}
                {accessToken && userRole !== "GUEST" && (
                  <>
                    <div className="my-2 border-t" />

                    <SheetClose asChild>
                      <Link
                        href={getDashboardRoute()}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </SheetClose>

                    {userRole === "ADMIN" && (
                      <>
                        <SheetClose asChild>
                          <Link
                            href="/dashboard/admin/host-verifications"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            <Users className="h-4 w-4" />
                            Host Verifications
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/dashboard/admin/categories"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            <Tag className="h-4 w-4" />
                            Categories
                          </Link>
                        </SheetClose>
                      </>
                    )}

                    {userRole === "HOST" && (
                      <>
                        <SheetClose asChild>
                          <Link
                            href="/dashboard/host/events"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            <Calendar className="h-4 w-4" />
                            My Events
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/dashboard/host/booked-events"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            <Users className="h-4 w-4" />
                            Booked Events
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/dashboard/host/events/create"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            <Calendar className="h-4 w-4" />
                            Create Event
                          </Link>
                        </SheetClose>
                      </>
                    )}

                    {userRole === "USER" && (
                      <SheetClose asChild>
                        <Link
                          href="/dashboard/user/bookings"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          <Calendar className="h-4 w-4" />
                          My Bookings
                        </Link>
                      </SheetClose>
                    )}

                    <div className="my-2 border-t" />

                    <SheetClose asChild>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/dashboard/change-password"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Change Password
                      </Link>
                    </SheetClose>
                  </>
                )}
              </nav>

              {/* Auth Buttons (Mobile) */}
              <div className="mt-6 space-y-2">
                {accessToken && userRole !== "GUEST" ? (
                  <LogoutButton />
                ) : (
                  <>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/register">Sign Up</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
