import ProfileContent from "@/components/modules/Dashboard/ProfileContent";
import ProfileSkeleton from "@/components/modules/Dashboard/Profileskeleton";
import { getUserInfo } from "@/service/auth/getUserIfo";
import React, { Suspense } from "react";

const CommonProfilePage = async () => {
  const userInfo = await getUserInfo();

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent user={userInfo} />
    </Suspense>
  );
};

export default CommonProfilePage;
