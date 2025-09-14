import { createContext, useContext, useMemo, useRef } from "react";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import "../style/toast.css"
const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const toastRef = useRef(null);

  const base = {
    position: { X: "Center", Y: "Top" },
    timeOut: 10000,
    extendedTimeOut: 10000,
    showCloseButton: true,
    showProgressBar: true,
    newestOnTop: true,
    cssClass: "app-toast",                
  };

  const api = useMemo(() => ({
    show: (opts = {}) => toastRef.current?.show({ ...base, ...opts }),
    success: (content, title = "Success") =>
      toastRef.current?.show({ ...base, title, content, cssClass: "app-toast e-toast-success" }),
    error: (content, title = "Error") =>
      toastRef.current?.show({ ...base, title, content, cssClass: "app-toast e-toast-danger" }),
    info: (content, title = "Info") =>
      toastRef.current?.show({ ...base, title, content, cssClass: "app-toast e-toast-info" }),
    warning: (content, title = "Warning") =>
      toastRef.current?.show({ ...base, title, content, cssClass: "app-toast e-toast-warning" }),
  }), []);

  return (
    <ToastCtx.Provider value={api}>
      <ToastComponent ref={toastRef} position={{ X: "Center", Y: "Top" }} />
      {children}
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
