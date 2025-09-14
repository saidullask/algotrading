import React, { useEffect, useMemo, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, X as Close } from "lucide-react";
import logo from "../../assets/prime_logo_ctechalgo.png";
import { Authservices } from "../../services/AuthServices";
import Config from "../../config";
import { sidebarForRole, ROLE } from "../../route";

function useAuthUser() {
  const [user, setUser] = useState(Authservices.currentUserValue);
  useEffect(() => {
    const sub = Authservices.currentUser.subscribe(setUser);
    return () => sub.unsubscribe();
  }, []);
  return user;
}

function reduceRole(user) {
  if (!user) return ROLE.CLIENT;
  const raw = (user.role || user.userRole || "").toString();
  if (raw === ROLE.SUPERADMIN) return ROLE.SUPERADMIN;
  if (raw === ROLE.ADMIN) return ROLE.ADMIN;
  return ROLE.CLIENT;
}

function Item({ to, icon: Icon, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition
        ${isActive ? "bg-slate-800/70 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800/40"}`
      }
    >
      {Icon ? <Icon className="h-4 w-4 opacity-80" /> : null}
      <span className="truncate">{children}</span>
    </NavLink>
  );
}

function SidebarContent({ menu, openSections, onToggleSection, onLogout, showClose, onClose }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between gap-3 px-4 border-b border-slate-800/80">
        <img
          src={logo}
          alt="C-Tech Algo"
          className="h-14 md:h-16 w-auto object-contain shrink-0 select-none
                     filter brightness-[1.05] contrast-[1.05] saturate-[1.05]
                     [filter:drop-shadow(0_1px_8px_rgba(56,189,248,0.22))]"
        />
        {showClose ? (
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-slate-300 hover:text-white hover:bg-slate-800/60"
          >
            <Close className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 overscroll-contain">
        {menu.map((item) => {
          if (item.type === "link") {
            const Icon = item.icon;
            return (
              <Item key={item.to} to={item.to} icon={Icon}>
                {item.label}
              </Item>
            );
          }

          if (item.type === "section") {
            const SectionIcon = item.icon;
            const open = !!openSections[item.id];
            return (
              <div key={item.id || item.label}>
                <button
                  onClick={() => onToggleSection(item.id)}
                  className="mt-2 mb-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-slate-400 hover:text-white hover:bg-slate-800/40 transition"
                >
                  <span className="flex items-center gap-3">
                    {SectionIcon ? <SectionIcon className="h-4 w-4 opacity-80" /> : null}
                    {item.label}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
                </button>

                {open && Array.isArray(item.children) && (
                  <div className="ml-2 space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <Item key={child.to} to={child.to} icon={ChildIcon}>
                          {child.label}
                        </Item>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </nav>

      <div className="border-t border-slate-800/80 p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:text-rose-200 hover:bg-rose-500/10 transition"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const user = useAuthUser();

  /* auth guard (same behavior) */
  useEffect(() => {
    const currentUser = Authservices.currentUserValue ?? null;
    if (currentUser === null) {
      Authservices.logout();
      navigate(Config.signInPath);
    }
  }, [navigate]);

  const role = reduceRole(user);
  const menu = useMemo(() => sidebarForRole(role), [role]);

  const [openSections, setOpenSections] = useState({});
  const toggleSection = (id) => setOpenSections((s) => ({ ...s, [id]: !s[id] }));

  /* ── Mobile drawer state + global event bindings ───────────────────── */
  const [mobileOpen, setMobileOpen] = useState(false);
  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);

  useEffect(() => {
    const onOpen = () => openMobile();
    const onClose = () => closeMobile();
    const onToggle = () => toggleMobile();
    window.addEventListener("sidebar:open", onOpen);
    window.addEventListener("sidebar:close", onClose);
    window.addEventListener("sidebar:toggle", onToggle);
    window.__toggleSidebar = toggleMobile;

    return () => {
      window.removeEventListener("sidebar:open", onOpen);
      window.removeEventListener("sidebar:close", onClose);
      window.removeEventListener("sidebar:toggle", onToggle);
    };
  }, [openMobile, closeMobile, toggleMobile]);

  const onLogout = () => Authservices.logout();

  return (
    <>
      <aside
        className="
          fixed left-0 top-0 z-40 h-full w-64
          border-r border-slate-800/80 bg-slate-950/95 backdrop-blur
          hidden md:flex flex-col
          [font-size:clamp(13px,0.9vw,16px)]
        "
        aria-label="Sidebar"
      >
        <SidebarContent
          menu={menu}
          openSections={openSections}
          onToggleSection={toggleSection}
          onLogout={onLogout}
          showClose={false}
        />
      </aside>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        } bg-black/50`}
        onClick={closeMobile}
        aria-hidden={!mobileOpen}
      />
      <aside
        className={`
          fixed left-0 top-0 z-50 md:hidden h-full w-64
          border-r border-slate-800/80 bg-slate-950/95 backdrop-blur
          transform transition-transform duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          [font-size:clamp(14px,3.5vw,16px)]
          pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Sidebar"
      >
        <SidebarContent
          menu={menu}
          openSections={openSections}
          onToggleSection={toggleSection}
          onLogout={onLogout}
          showClose
          onClose={closeMobile}
        />
      </aside>
    </>
  );
}
