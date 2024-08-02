"use client";

import Link from "next/link";
import React from "react";
import { links } from "../constants";
import { usePathname } from "next/navigation";

const DashboardNavbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-evenly items-center h-12 p-5 w-full">
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
    </nav>
  );
};

export default DashboardNavbar;
