"use client";

import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import algebra from "../../../../images/algebra.jpg"; // Make sure to replace with actual image paths if different
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
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

  if (user?.user?._id !== id) {
    redirect("/");
  }

  const {
    data: userUnlockedLessons,
    isLoading,
    isError,
  } = useQuery<UserData[], Error>({
    queryKey: ["classLessons", id],
    queryFn: async () => {
      const { data } = await api.get(`/owned/${id}`);
      return data;
    },
  });

  if (isError || !userUnlockedLessons || userUnlockedLessons.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center p-3">
        <h1 className="text-3xl font-bold">عذرا ، لا يوجد أي دروس متاحة لك.</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-10 min-h-screen">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {userUnlockedLessons &&
          userUnlockedLessons.map((lessonData: UserData) => (
            <div
              key={lessonData._id}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
            >
              <Image
                alt=""
                width={350}
                height={200}
                src={algebra}
                className="rounded-lg mb-4"
              />
              <h1 className="text-xl font-semibold text-gray-800 mb-2">
                {lessonData.lessonId?.title}
              </h1>
              <p className="text-gray-600 mb-4">{lessonData.lessonId?.desc}</p>
              <h4 className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mb-4">
                الوحدة {lessonData.lessonId?.unit}
              </h4>
              <div className="flex gap-5">
                <Link href={`/lessons/watch/${lessonData.lessonId?._id}`}>
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    مشاهدة
                  </Button>
                </Link>
                <Link href={`/lessons/assignments/${lessonData.lessonId?._id}`}>
                  <Button className="bg-green-500 text-white hover:bg-green-600">
                    الواجب
                  </Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserUnlockedLessons;
