import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "../globals.css";
import { ReactQueryClientProvider } from "../QueryClientProvider";
import Sidebar from "../Sidebar";
import SidebarItem from "../components/sidebar/SidebarItem";
import { LayoutDashboard, MessageCircle, Settings } from "lucide-react";
import { Toaster } from "sonner";
import ChatSupport from "../components/ChatSupport";
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CheckMate",
  description: "For students and teachers to manage their classes and reviews.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning className="h-full">
        <body className={cn("font-spoqa relative flex h-full")}>
          <main className="relative w-full h-screen overflow-auto">{children}</main>
          <Toaster position="top-center" />
          <ChatSupport />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
