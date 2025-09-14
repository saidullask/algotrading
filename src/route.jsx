import React, { lazy } from "react";
import {
  LayoutDashboard,
  LineChart,
  FolderKanban,
  CandlestickChart,
  Settings,
} from "lucide-react";

export const ROLE = {
  SUPERADMIN: "SuperAdmin",
  ADMIN: "Admin",
  CLIENT: "client",
};

const LandingPage = lazy(() => import("./layout/LandingPage"));
const DocsPage = lazy(() => import("./layout/DocsPage"));
const Dashboard = lazy(() => import("./layout/Dashboard"));

const Index = lazy(() => import("./pages/Index"));
const Privacy = lazy(() => import("./pages/policies/Privacy"));
const RefundPolicy = lazy(() => import("./pages/policies/RefundPolicy"));
const SubscriptionCancellatin = lazy(() => import("./pages/policies/SubscriptionCancellatin"));
const TermCondition = lazy(() => import("./pages/policies/TermCondition"));
const Strategies = lazy(() => import("./pages/policies/Strategies"));

const Login = lazy(() => import("./pages/auth/login"));
const Registration = lazy(() => import("./pages/auth/Registration"));

//admin
const Market = lazy(() =>
  import("./pages/market").then((m) => ({ default: m.Market }))
);

const Createmasterrule = lazy(() => import("./pages/masterrule/createmasterrule"));
const ViewMasterRule = lazy(() => import("./pages/masterrule/viewmasterrule"));
const ViewSquarOffMasterRules = lazy(() => import("./pages/masterrule/viewsquaroffrule"));

const ViewClient = lazy(() => import("./pages/client/viewClient"));
const InterestedClient = lazy(() => import("./pages/client/interestedClient"));

const ViewStrategy = lazy(() => import("./pages/strategy/viewStrategy"));
const AddAssignToClient = lazy(() => import("./pages/strategy/addClientToStrategy"));

const ProfitLoss = lazy(() => import("./pages/profitLoss"));


//client
const Belief = lazy(() => import("./pages/forclient/belief"));
const WhatWeDo = lazy(() => import("./pages/forclient/whatwedo"));
const TermConditionClient = lazy(() => import("./pages/forclient/termandcondition"));
const Price = lazy(() => import("./pages/forclient/pricing"));
const Product = lazy(() => import("./pages/forclient/product"));
export const publicRoutes = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  { path: "/singup", element: <Registration /> },
  { path: "/documentation", element: <DocsPage /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/refundpolicy", element: <RefundPolicy /> },
  { path: "/strategy", element: <Strategies /> },
  { path: "/subscriptioncancellationpolicy", element: <SubscriptionCancellatin /> },
  { path: "/termcondition", element: <TermCondition /> },
];

export function getDashboardChildrenByRole(role) {
  if (role === ROLE.SUPERADMIN || role === ROLE.ADMIN) {
    return [
      { path: "/dashboard/index", element: <Index /> },

      { path: "/dashboard/rule/createmasterrule", element: <Createmasterrule /> },
      { path: "/dashboard/rule/viewmasterrule", element: <ViewMasterRule /> },
      { path: "/dashboard/rule/viewsquaroffmasterrule", element: <ViewSquarOffMasterRules /> },

      { path: "/dashboard/client/viewclient", element: <ViewClient /> },
      { path: "/dashboard/client/interestedclient", element: <InterestedClient /> },

      { path: "/dashboard/strategy/viewstrategy", element: <ViewStrategy /> },
      { path: "/dashboard/strategy/addassigntoclient", element: <AddAssignToClient /> },

      { path: "/dashboard/profitloss", element: <ProfitLoss /> },
      { path: "/dashboard/market", element: <Market /> },
    ];
  }

  return [
    { path: "/dashboard/index", element: <Index /> },
    { path: "/dashboard/belief", element: <Belief /> },
    { path: "/dashboard/whatwedo", element: <WhatWeDo /> },
    { path: "/dashboard/termandcondition", element: <TermConditionClient /> },
    { path: "/dashboard/profitloss", element: <ProfitLoss /> },
    { path: "/dashboard/price", element: <Price /> },
    { path: "/dashboard/product", element: <Product /> },
    { path: "/dashboard/market", element: <Market /> },
  ];
}

const adminSidebarMenu = [
  { type: "link", to: "/dashboard/index", icon: LayoutDashboard, label: "Overview" },
  { type: "link", to: "/dashboard/market", icon: LineChart, label: "Markets" },

  {
    type: "section",
    label: "Master Rule",
    icon: FolderKanban,
    id: "masterRule",
    children: [
      { to: "/dashboard/rule/createmasterrule", icon: CandlestickChart, label: "Create MasterRule" },
      { to: "/dashboard/rule/viewmasterrule", icon: CandlestickChart, label: "View MasterRule" },
      { to: "/dashboard/rule/viewsquaroffmasterrule", icon: CandlestickChart, label: "View Squr Off MasterRule" },
    ],
  },
  {
    type: "section",
    label: "Order",
    icon: FolderKanban,
    id: "order",
    children: [
      { to: "/dashboard/strategies/momentum", icon: CandlestickChart, label: "Current Order" },
      { to: "/dashboard/strategies/mean-rev", icon: CandlestickChart, label: "Manual Order History" },
      { to: "/dashboard/strategies/options", icon: CandlestickChart, label: "Old Rule Order History" },
    ],
  },
  {
    type: "section",
    label: "Strategies",
    icon: FolderKanban,
    id: "strategies",
    children: [
      { to: "/dashboard/strategy/viewstrategy", icon: CandlestickChart, label: "Strategy" },
      { to: "/dashboard/strategy/addassigntoclient", icon: CandlestickChart, label: "Assign Client To  Strategy" },
    ],
  },
  {
    type: "section",
    label: "Manage Client",
    icon: FolderKanban,
    id: "manageClient",
    children: [
      { to: "/dashboard/client/viewclient", icon: CandlestickChart, label: "View Client" },
      { to: "/dashboard/client/interestedclient", icon: CandlestickChart, label: "Interested Client" },
    ],
  },
  { type: "link", to: "/dashboard/profitloss", icon: Settings, label: "Profit Loss" },
];

const clientSidebarMenu = [
  { type: "link", to: "/dashboard/index", icon: LayoutDashboard, label: "Overview" },
  { type: "link", to: "/dashboard/market", icon: LineChart, label: "Markets" },
  { type: "link", to: "/dashboard/belief", icon: Settings, label: "Belief" },
  { type: "link", to: "/dashboard/whatwedo", icon: Settings, label: "What We Do" },
  { type: "link", to: "/dashboard/termandcondition", icon: Settings, label: "Term And Condition" },
  { type: "link", to: "/dashboard/price", icon: Settings, label: "Price" },
  { type: "link", to: "/dashboard/product", icon: Settings, label: "Product" },
  { type: "link", to: "/dashboard/profitloss", icon: Settings, label: "ProfitLoss" },
];

export function getSidebarMenuForRole(role) {
  return (role === ROLE.ADMIN || role === ROLE.SUPERADMIN)
    ? adminSidebarMenu
    : clientSidebarMenu;
}
export const sidebarForRole = getSidebarMenuForRole;

export function buildRoutesForRole(role) {
  return [
    ...publicRoutes,
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: getDashboardChildrenByRole(role),
    },
  ];
}
