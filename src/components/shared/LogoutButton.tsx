"use client";
import { Button } from "../ui/button";
import { logOutUser } from "@/service/auth/logoutUser";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logOutUser();
  };
  return (
    <Button
      className="cursor-pointer"
      variant="destructive"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
