"use client";

import { Button } from "@/components/ui/button";
import { Book, UserRoundCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import hero from "../images/hero.png";
import { useUserContext } from "../context/UserContext";

const Hero = () => {
  const { user }: any = useUserContext();
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-28 container">
      <div>
        <Image width={600} height={600} alt="" src={hero} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold  text-gray-500">
          الاستاذ في الرياضيات
        </h1>
        <h6 className="md:text-5xl text-3xl font-semibold text-gray-500 p-3 ">
          هاشم شكري
        </h6>
        <p className="md:text-3xl text-xl font-semibold text-gray-500 p-3 ">
          منصة مختصة في الغوص في
          <br /> عالم الرياضيات
        </p>
        {!user ? (
          <Link href="/sign-in">
            <Button
              variant="destructive"
              className="flex gap-2 p-7 transition-all duration-300 ease-in-out transform hover:shadow-md hover:translate-y-0.5"
            >
              تسجيل الدخول
              <UserRoundCheck />
            </Button>
          </Link>
        ) : (
          <Link href={`/lessons/user/${user?.user?._id}`}>
            <Button
              variant="destructive"
              className="flex gap-2 p-7 transition-all duration-300 ease-in-out transform hover:shadow-md hover:translate-y-0.5"
            >
              دروسي
              <Book />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
