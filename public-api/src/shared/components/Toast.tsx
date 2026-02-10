import React from "react";
import { twJoin } from "tailwind-merge";
import { Portal } from "./Portal";

const TOAST_DURATION_MS = 4000;

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

export const Toast = ({ message, visible, onDismiss }: ToastProps) => {
  React.useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDismiss, TOAST_DURATION_MS);
    return () => clearTimeout(t);
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <Portal>
      <div
        className={twJoin(
          "fixed right-4 top-4 z-[100] rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-lg transition-opacity duration-200",
        )}
        role="status"
      >
        {message}
      </div>
    </Portal>
  );
};
