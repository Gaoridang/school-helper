import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "../globals.css";
import { ReactQueryClientProvider } from "../QueryClientProvider";
import Sidebar from "../Sidebar";
import SidebarItem from "../components/sidebar/SidebarItem";
import { LayoutDashboard, MessageCircle, Settings } from "lucide-react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CheckMate",
  description: "For students and teachers to manage their classes and reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning className="h-full">
        <body className={cn("font-spoqa relative flex h-full")}>
          <Sidebar>
            <SidebarItem
              icon={<LayoutDashboard size={22} strokeWidth={2.5} />}
              text="대시보드"
              href="/"
            />
            <SidebarItem
              icon={<Settings size={22} strokeWidth={2.5} />}
              text="프로필 설정"
              href="/settings"
            />
            <SidebarItem
              icon={<MessageCircle size={22} strokeWidth={2.5} />}
              text="문의하기"
              href="/contact"
            />
          </Sidebar>
          <main className="relative w-full h-screen overflow-auto">{children}</main>
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
