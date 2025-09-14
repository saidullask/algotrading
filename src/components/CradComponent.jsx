import React from "react";

export function Button({ variant = "solid", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition border";
  const solid = "bg-emerald-500 border-emerald-500 text-white hover:opacity-90";
  const outline = "bg-transparent border-slate-700 text-slate-200 hover:text-white";
  const ghost = "bg-transparent border-transparent text-slate-300 hover:text-white";
  const style = variant === "outline" ? outline : variant === "ghost" ? ghost : solid;
  return <button className={`${base} ${style} ${className}`} {...props} />;
}

export function Card({ className = "", children }) {
  return <div className={`border border-slate-800 bg-slate-900/50 rounded-2xl ${className}`}>{children}</div>;
}
export function CardHeader({ className = "", children }) {
  return <div className={`p-6 border-b border-slate-800 ${className}`}>{children}</div>;
}
export function CardTitle({ className = "", children }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}
export function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export default { Button, Card, CardHeader, CardTitle, CardContent };
