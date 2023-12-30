"use client";

import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import algebra from "../../../../images/algebra.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";

interface UserData {
  _id: string;
  userId: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    eduyear: string;
    phoneNumber: string;
    type: string;
  };
  lessonId: {
    _id: string;
    title: string;
    videoURL: string;
    unit: string;
    isPaid: boolean;
    desc: string;
    price: string;
    classroom: string;
  };
}

const UserUnlockedLessons = () => {
  const { id } = useParams<{ id: string }>();

  const { user }: any = useUserContext();

  console.log(user?.user?._id);
  console.log(id);

  if (user?.user?._id !== id) {
    redirect("/");
  }

  const {
    data: userUnlockedLEssons,
    isLoading,
    isError,
  } = useQuery<UserData[], Error>({
    queryKey: ["classLessons", id],
    queryFn: async () => {
      const { data } = await api.get(`/owned/${id}`);
      return data;
    },
  });

  if (isError || !userUnlockedLEssons || userUnlockedLEssons.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-3xl font-bold">عذرا ، لا يوجد أي دروس متاحة لك.</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    ); // Optionally show a loading indicator
  }
  return (
    <div className="flex items-center flex-col p-10">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-9 p-10 rounded-lg">
        {userUnlockedLEssons &&
          userUnlockedLEssons.map((lessonData: UserData) => (
            <div key={lessonData._id} className="flex flex-col items-center">
              {/* Use Image component with appropriate src */}
              <Image
                alt=""
                width={350}
                height={300}
                src={algebra} // Replace with appropriate image source
                className=" transition-all duration-500 hover:rotate-2 rounded-lg"
              />

              <div className="flex flex-col font-mono items-center bg-white opacity-90 p-5 shadow-lg w-[380px] md:w-[550px] relative bottom-5 rounded-lg">
                <h1 className="text-xl font-semibold p-2 font-mono">
                  {lessonData.lessonId.title}
                </h1>
                <p className="p-2 font-semibold">{lessonData.lessonId.desc}</p>
                <div className="flex flex-row gap-5">
                  <h4 className=" font-bold bg-blue-300 p-3 rounded-lg">
                    الوحدة {lessonData.lessonId.unit}
                  </h4>
                </div>
                {/* Replace Button with your actual component */}
                <Link href={`/lessons/watch/${lessonData.lessonId._id}`}>
                  <Button className="m-5">مشاهدة</Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserUnlockedLessons;
