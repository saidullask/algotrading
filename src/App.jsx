import React, { Suspense, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { registerLicense } from "@syncfusion/ej2-base";
import { ToastProvider } from "./components/ToastHost";
import { buildRoutesForRole, ROLE } from "./route";
import { Authservices } from "./services/AuthServices";

function CenterLoader() {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full border-4 border-slate-700 border-t-emerald-400 animate-spin" />
        <div className="text-xs tracking-wide text-slate-400">Loading…</div>
      </div>
    </div>
  );
}

function useAuthUser() {
  const [user, setUser] = useState(Authservices.currentUserValue);
  useEffect(() => {
    const sub = Authservices.currentUser.subscribe(setUser);
    return () => sub.unsubscribe();
  }, []);
  return user;
}

function roleFromUser(user) {
  if (!user) return null;
  const raw = (user.role || user.userRole || "").toString().toLowerCase();
  if (raw === "superadmin") return ROLE.ADMIN; 
  if (raw === "admin") return ROLE.ADMIN;
  return ROLE.CLIENT;
}

function renderRoutes(routes) {
  return routes.map((r, i) => {
    const { path, element, children } = r;
    return (
      <Route key={path || i} path={path} element={element}>
        {Array.isArray(children) && children.length ? renderRoutes(children) : null}
      </Route>
    );
  });
}

function App() {
  registerLicense("Ngo9BigBOggjHTQxAR8/V1JFaF5cXGRCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXZfcHVRQ2lcV0R+V0VWYEg=");

  const user = useAuthUser();        
  const role = roleFromUser(user) || ROLE.CLIENT;

  const routesForRole = useMemo(() => buildRoutesForRole(role), [role]);

  return (
    <ToastProvider>
      <Router>
        <Suspense fallback={<CenterLoader />}>
          <Routes>
            {renderRoutes(routesForRole)}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ToastProvider>
  );
}

export default App;
