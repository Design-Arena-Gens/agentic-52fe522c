import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Habit Pulse",
  description: "Mobile-first habit tracker with streaks and reminders."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
