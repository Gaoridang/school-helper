import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ReactQueryClientProvider } from "../QueryClientProvider";
import Sidebar from "../Sidebar";
import SidebarItem from "../components/sidebar/SidebarItem";
import { LayoutDashboard, MessageCircle, Settings } from "lucide-react";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/SpoqaHanSansNeo-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/SpoqaHanSansNeo-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/SpoqaHanSansNeo-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/SpoqaHanSansNeo-Bold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning className="h-full">
        <body className={cn(pretendard.className, "relative flex h-full")}>
          <Sidebar>
            <SidebarItem
              icon={<LayoutDashboard size={22} strokeWidth={2.5} />}
              text="대시보드"
              active
            />
            <SidebarItem icon={<Settings size={22} strokeWidth={2.5} />} text="프로필 설정" />
            <SidebarItem
              icon={<MessageCircle size={22} strokeWidth={2.5} />}
              text="문의하기"
              alert
            />
          </Sidebar>
          <main className="w-full">{children}</main>
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
