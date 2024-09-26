"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Book,
  ChevronsLeftRight,
  Lightbulb,
  LogOut,
  MenuSquare,
  Projector,
  UserPlus,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import { useUserContext } from "../context/UserContext";
import logo from "../images/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ButtonProps {
  href: string;
  text: string;
  IconComponent: any;
  variant?: "default" | "destructive" | "outline";
  onClick?: () => void;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user }: any = useUserContext();

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const loggedIn = !!user;
  const renderLinkButton = ({
    href,
    text,
    IconComponent,
    variant = "default",
    onClick,
  }: ButtonProps) => (
    <Link href={href}>
      <Button
        className={`flex gap-2 p-7 w-full ${
          variant === "destructive" ? "variant-destructive" : ""
        }`}
        onClick={onClick}
      >
        {text}
        <IconComponent />
      </Button>
    </Link>
  );

  return (
    <div className="container">
      <div className="flex justify-between items-center h-16 p-4 md:hidden">
        <button onClick={toggleSidebar} className="p-2">
          {isOpen ? <ChevronsLeftRight /> : <MenuSquare />}
        </button>
        <Link href="/">
          <Image src={logo} width={100} height={100} alt="Logo" />
        </Link>
      </div>

      <div
        className={`md:hidden fixed inset-0 transition-all duration-300 ease-in-out z-[999999] transform ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col h-13 w-full ">
          <button
            onClick={toggleSidebar}
            className="p-4 text-xl font-semibold self-end"
          >
            &times;
          </button>
          <div className="flex flex-col p-4 gap-4 bg-gradient-to-r from-cyan-500 to-blue-500">
            {!loggedIn ? (
              <>
                {renderLinkButton({
                  href: "/sign-in",
                  text: "تسجيل الدخول",
                  IconComponent: UserRoundCheck,
                })}
                {renderLinkButton({
                  href: "/sign-up",
                  text: "انشاء حساب",
                  IconComponent: UserPlus,
                })}
              </>
            ) : (
              <>
                {renderLinkButton({
                  href: "#",
                  text: "تسجيل الخروج",
                  IconComponent: LogOut,
                  variant: "destructive",
                  onClick: logout,
                })}
                {renderLinkButton({
                  href: `/lessons/user/${user?.user?._id}`,
                  text: "الدروس",
                  IconComponent: Book,
                })}
                {renderLinkButton({
                  href: `/exam/`,
                  text: "الامتحانات",
                  IconComponent: Book,
                })}
                {user?.user?.type === "teacher" && (
                  <>
                    {renderLinkButton({
                      href: "/dashboard",
                      text: " لوحة التحكم",
                      IconComponent: UserPlus,
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-row justify-between items-center h-16 p-4">
        {loggedIn ? (
          <div className="flex gap-2">
            {renderLinkButton({
              href: "#",
              text: "تسجيل الخروج",
              IconComponent: LogOut,
              variant: "destructive",
              onClick: logout,
            })}
            {renderLinkButton({
              href: `/lessons/user/${user?.user?._id}`,
              text: "الدروس",
              IconComponent: Book,
            })}
            {renderLinkButton({
              href: `/exam/`,
              text: "الامتحانات",
              IconComponent: Book,
            })}
            {user?.user?.type === "teacher" && (
              <>
                {renderLinkButton({
                  href: "/dashboard",
                  text: " لوحة التحكم",
                  IconComponent: UserPlus,
                })}
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            {renderLinkButton({
              href: "/sign-in",
              text: "تسجيل الدخول",
              IconComponent: UserRoundCheck,
            })}
            {renderLinkButton({
              href: "/sign-up",
              text: "انشاء حساب",
              IconComponent: UserPlus,
            })}
          </div>
        )}
        <div className="flex items-center m-2">
          <Link href="/">
            <Image src={logo} width={100} height={100} alt="Logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
