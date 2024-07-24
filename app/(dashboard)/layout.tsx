import QueryProvider from "../components/QueryProvider";
import Sidebar from "../components/Sidebar";
import { UserProvider } from "../context/UserContext";
import "../globals.css";
import { Readex_Pro } from "next/font/google";

export const metadata = {
  title: "Dashboard",
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
        <UserProvider>
          <QueryProvider>
            <div className="flex h-screen overflow-hidden">
              <div className="w-1/5 md:w-1/6 shadow-md bg-white">
                <Sidebar />
              </div>
              <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                {children}
              </div>
            </div>
          </QueryProvider>
        </UserProvider>
      </body>
    </html>
  );
}
