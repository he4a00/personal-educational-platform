import DashboardNavbar from "../components/DashboardNavbar";
import QueryProvider from "../components/QueryProvider";
import Sidebar from "../components/Sidebar";
import { UserProvider } from "../context/UserContext";
import "../globals.css";
import { Readex_Pro } from "next/font/google";

export const metadata = {
  title: "لوحة التحكم",
};

const inter = Readex_Pro({ subsets: ["arabic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <QueryProvider>
          <div className="md:hidden flex">
            <DashboardNavbar />
          </div>
          <div className="flex h-screen overflow-hidden">
            <div className="w-1/5 md:w-1/6 shadow-md bg-white hidden md:flex">
              <Sidebar />
            </div>
            <UserProvider>
              <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                {children}
              </div>
            </UserProvider>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
