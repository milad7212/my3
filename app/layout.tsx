import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { useEffect } from "react";
import AuthProvider from "./auth/Provider";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpeedForm",
  description: "SpeedForm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          {/* <NavBar /> */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
