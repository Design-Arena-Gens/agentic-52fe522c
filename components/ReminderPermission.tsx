"use client";

import { useEffect, useState } from "react";

type ReminderPermissionProps = {
  onGranted?: () => void;
};

export const ReminderPermission = ({ onGranted }: ReminderPermissionProps) => {
  const [status, setStatus] = useState<NotificationPermission | "unsupported">(
    typeof window === "undefined" || !("Notification" in window)
      ? "unsupported"
      : Notification.permission
  );

  useEffect(() => {
    if (status === "granted" && onGranted) {
      onGranted();
    }
  }, [status, onGranted]);

  if (status === "unsupported") return null;
  if (status !== "default" && status !== "denied") return null;

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setStatus(result);
    } catch {
      setStatus("denied");
    }
  };

  return (
    <div className="rounded-3xl border border-accent/30 bg-accent/10 p-4 text-sm text-slate-100">
      <p className="font-semibold">Enable push reminders</p>
      <p className="mt-1 text-xs text-slate-200/70">
        Allow notifications so we can ping you when a habit reminder is due.
      </p>
      <button
        type="button"
        onClick={requestPermission}
        className="mt-3 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-900"
      >
        Allow notifications
      </button>
    </div>
  );
};
