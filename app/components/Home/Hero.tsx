"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUserContext } from "@/app/context/UserContext";
import Link from "next/link";

export default function Hero() {
  const { user }: any = useUserContext();
  return (
    <div className="relative min-h-screen overflow-hidden container pt-28">
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-y-5">
        {/* Left section with text */}
        <div className="hidden md:flex">
          <Image
            width={600}
            height={600}
            alt="hero image"
            src="https://res.cloudinary.com/dortdlynv/image/upload/v1720606966/hero_k7droq.png"
          />
        </div>
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 text-gray-800 leading-tight">
            <span className="inline-block transform -rotate-3 text-blue-600">
              الأستاذ
            </span>{" "}
            <span className="inline-block transform rotate-2 text-green-600">
              في الرياضيات،
            </span>
            <br />
            <span className="inline-block transform -rotate-1 text-red-600">
              هاشم شكري
            </span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-gray-700 font-light mt-2">
            <span className="inline-block transform -rotate-3 text-green-600 font-semibold">
              استكشف الرياضيات
            </span>
            <br />
            <span className="inline-block transform -rotate-3 text-red-600 font-semibold">
              بعيون جديدة{" "}
            </span>
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {!user && (
              <Link href="/sign-in">
                <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-10 py-4 rounded-full text-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                  انضم الان
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
