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
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <QueryProvider>
            <div className="flex flex-col md:flex-row h-screen">
              <div className="w-full md:w-1/6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <Sidebar />
              </div>
              <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                {children}
              </div>
            </div>
          </QueryProvider>
        </UserProvider>
      </body>
    </html>
  );
}
