import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/Pretendard-Light.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/Pretendard-Bold.woff2",
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
    // Why this?
    <html lang="en" suppressHydrationWarning>
      <body className={pretendard.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="m-5">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
