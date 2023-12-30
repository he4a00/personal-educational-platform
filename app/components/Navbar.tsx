"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Book,
  ChevronsLeftRight,
  LogOut,
  MenuSquare,
  UserPlus,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import { useUserContext } from "../context/UserContext";
import logo from "../images/logo.png";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user }: any = useUserContext();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // let loggedIn: boolean = false;
  // let userInfo: any = null;

  // useEffect(() => {
  //   const user: any = localStorage.getItem("user");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   loggedIn = !!user; // Check if user exists
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   userInfo = JSON.parse(user);
  // }, []);

  const loggedIn = !!user;

  return (
    <div className="container">
      {/* Navbar */}
      <div className="flex justify-between items-center h-16 p-4 md:hidden">
        {/* Hamburger icon for mobile */}
        <button onClick={toggleSidebar} className="p-2">
          {isOpen ? <ChevronsLeftRight /> : <MenuSquare />}
        </button>
        <Image src={logo} width={150} height={150} alt="" />
      </div>

      {/* Sidebar */}
      <div
        className={`md:hidden fixed inset-0 transition-all duration-300 ease-in-out z-[999999] transform ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col h-13 w-full ">
          {/* Close button */}
          <button
            onClick={toggleSidebar}
            className="p-4 text-xl font-semibold self-end"
          >
            &times;
          </button>
          <div className="flex flex-col p-4 gap-4 bg-gradient-to-r from-cyan-500 to-blue-500">
            {!loggedIn ? (
              <Link href="/sign-in">
                <Button className="flex gap-2 p-7 w-full">
                  تسجيل الدخول
                  <UserRoundCheck />
                </Button>
              </Link>
            ) : (
              <>
                {/* Logout button if logged in */}
                <Button
                  variant="destructive"
                  className="flex gap-2 p-7 w-full"
                  onClick={() => logout()}
                >
                  تسجيل الخروج
                  <LogOut />
                </Button>
                <Link href={`/lessons/user/${user?.user?._id}`}>
                  <Button
                    variant="destructive"
                    className="flex gap-2 p-7 w-full"
                  >
                    الدروس
                    <LogOut />
                  </Button>
                </Link>

                {/* Render 'Add Lesson' button if the user is a teacher */}
                {user?.user?.type === "teacher" && (
                  <>
                    <Link href="/add-lesson">
                      <Button
                        variant="destructive"
                        className="flex gap-2 p-7 w-full transition-all duration-700 hover:bg-transparent hover:text-black z-100"
                      >
                        اضافة درس
                        <UserPlus />
                      </Button>
                    </Link>
                    <Link href="/unlock-lesson">
                      <Button
                        variant="destructive"
                        className="flex gap-2 p-7 w-full transition-all duration-700 hover:bg-transparent hover:text-black z-100"
                      >
                        فتح درس
                        <UserPlus />
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {/* Overlay when sidebar is open */}
      </div>

      {/* Main content */}
      <div className="hidden md:flex flex-row justify-between items-center h-16 p-4">
        {/* Logo */}

        {/* Buttons */}
        {loggedIn ? (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              className="flex gap-2 p-7"
              onClick={() => logout()}
            >
              تسجيل الخروج
              <LogOut />
            </Button>
            <Link href={`/lessons/user/${user?.user?._id}`}>
              <Button className="flex gap-2 p-7 w-full">
                الدروس
                <Book />
              </Button>
            </Link>
            {user?.user?.type === "teacher" && (
              <>
                <Link href="/add-lesson">
                  <Button className="flex gap-2 p-7 w-full transition-all duration-700 hover:bg-transparent hover:text-black">
                    اضافة درس
                    <UserPlus />
                  </Button>
                </Link>
                <Link href="/unlock-lesson">
                  <Button className="flex gap-2 p-7 w-full transition-all duration-700 hover:bg-transparent hover:text-black z-100">
                    فتح درس
                    <UserPlus />
                  </Button>
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="flex gap-2 p-7 transition-all duration-300 ease-in-out transform hover:shadow-md hover:translate-y-0.5"
              >
                تسجيل الدخول
                <UserRoundCheck />
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant="destructive"
                className="flex gap-2 p-7 transition-all duration-700 hover:bg-transparent hover:text-black hover:border-2 hover:border-red-500 animate-bounce"
              >
                انشاء حساب
                <UserPlus />
              </Button>
            </Link>
          </div>
        )}
        <Link href="/">
          <Image src={logo} width={150} height={150} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
