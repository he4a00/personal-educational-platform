import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "../globals.css";
import QueryProvider from "../components/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "../components/Navbar";
import { UserProvider } from "../context/UserContext";

// import Footer from "../components/Footer";

const inter = Readex_Pro({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "منصة الرياضيات",
  description: "منصة الاستاذ هاشم شكري لمادة الرياضيات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.className} image-style`}>
        <UserProvider>
          <QueryProvider>
            <Navbar />
            {children}
          </QueryProvider>
        </UserProvider>
        {/* <Footer /> */}
        <Toaster />
      </body>
    </html>
  );
}
