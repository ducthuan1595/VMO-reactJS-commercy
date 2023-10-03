import React from "react";
import MainLayout from "../layout/Main";
import Profile from "../components/body/Profile";
import DetailProfile from "../components/body/DetailProfile";

export default function Account() {
  return (
    <MainLayout>
      <div className="w-full flex gap-8 pb-16 rounded-t-xl">
        <Profile />
        <DetailProfile />
      </div>
    </MainLayout>
  );
}
