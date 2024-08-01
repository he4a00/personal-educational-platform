"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../images/logo.png";

const Sidebar = () => {
  const links = [
    {
      name: "Users",
      view: "الطلاب",
    },
    {
      name: "Lessons",
      view: "الدروس",
    },
    {
      name: "Exams",
      view: "الامتحانات",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-4 bg-gray-50">
      <div className="flex items-center gap-3 p-4 mb-10 border-b-2">
        <Link href="/">
          <Image src={logo} alt="Teacher" width={50} height={50} />
        </Link>
        <h1 className="text-xl font-bold">The Teacher</h1>
      </div>
      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            href={`/dashboard/${link.name.toLowerCase()}`}
            key={link.name}
            className={`flex items-center gap-3 p-4 rounded-lg transition ${
              pathname.toLowerCase() === `/dashboard/${link.name.toLowerCase()}`
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{link.view}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
