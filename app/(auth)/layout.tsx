import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ReactQueryClientProvider } from "../QueryClientProvider";
import "../globals.css";

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
        <body className={cn("font-spoqa relative flex h-full")}>
          <main className="w-full">{children}</main>
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
