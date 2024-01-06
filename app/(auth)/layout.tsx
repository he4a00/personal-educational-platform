import { Rubik } from "next/font/google";
import "../globals.css";
import { UserProvider } from "../context/UserContext";
import QueryProvider from "../components/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "تسجيل الدخول",
  description: "منصة الاستاذ هاشم شكري لمادة الرياضيات",
};

const inter = Rubik({ subsets: ["arabic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.className} bg-black text-white h-screen flex`}>
        <UserProvider>
          <QueryProvider>{children}</QueryProvider>
        </UserProvider>
      </body>
      <Toaster />
    </html>
  );
}
