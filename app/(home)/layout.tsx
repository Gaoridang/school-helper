import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import ChatSupport from "../components/ChatSupport";
import Header from "../components/header";
import "../globals.css";
import { ReactQueryClientProvider } from "../QueryClientProvider";
import { createClient } from "../utils/supabase/server";

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
        <body className={cn("font-spoqa h-full grid grid-rows-[56px_1fr]")}>
          <Header />
          <main className="relative h-full flex-1 p-4">{children}</main>
          <Toaster position="top-center" />
          <ChatSupport />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
