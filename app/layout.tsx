import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOFT2301 · LMS",
  description: "Software Project Management — interactive study guide",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
