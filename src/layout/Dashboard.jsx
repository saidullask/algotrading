import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebarcomponents/Sidebar";
import Topbar from "../components/sidebarcomponents/Topbar";
import { Authservices } from "../services/AuthServices";
import Config from "../config";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = Authservices.currentUserValue ?? null;
    if (currentUser === null) {
      Authservices.logout();
      navigate(Config.signInPath);
    }
  }, [navigate]);

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="md:ml-64 flex min-h-dvh flex-col">
        <Topbar />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 overflow-x-auto pb-[env(safe-area-inset-bottom)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
