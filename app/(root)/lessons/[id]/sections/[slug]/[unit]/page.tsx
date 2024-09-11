"use client";

import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { ClipboardList, GraduationCap, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import React from "react";
import { useUserContext } from "@/app/context/UserContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loader from "@/app/components/Loader";
import NoDataFound from "@/app/components/NoDataFound";

interface LessonData {
  _id: string;
  assignment?: string;
  title: string;
  isPaid: boolean;
  desc: string;
  price: string;
  unit: string;
  videoURL: string;
  classroom: string;
  section: string;
  likes: number;
}

interface LessonProps {
  lessons: LessonData[];
}

const LessonsByUnit = () => {
  const params = useParams<{ slug: string; id: string; unit: string }>();
  const section = decodeURIComponent(params.slug);
  const classroom = decodeURIComponent(params.id);
  const unit = decodeURIComponent(params.unit);

  const { user }: any = useUserContext();

  const {
    data: classLessons,
    isLoading,
    isFetching,
    isError,
  } = useQuery<LessonProps, Error>({
    queryKey: ["classLessons"],
    queryFn: async () => {
      try {
        const { data } = await api.get(
          `/lessons/classes/${section}/${unit}/${classroom}/`
        );
        return data;
      } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to fetch lessons");
      }
    },
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError || !classLessons || classLessons.lessons.length === 0) {
    return (
      <NoDataFound
        mainText="لا يوجد دروس لهذا الصف في الوقت الحالي"
        subText="يبدو انه لا يوجد دروس في هذه اللحظة ، برجاء التحقق من الصفحة مرة اخري او بعد مدة."
      />
    );
  }

  const lessonsArray = Array.isArray(classLessons)
    ? classLessons
    : [classLessons];

  return (
    <div className="flex items-center flex-col p-10">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        الدروس الخاصة ب{classroom}
      </h2>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-16 md:gap-x-80 pt-10">
        {lessonsArray.map((classLesson: LessonProps) =>
          classLesson.lessons.map((lesson: LessonData) => (
            <>
              <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-75"></div>
                  <Image
                    className="h-48 w-full object-cover mix-blend-overlay"
                    src="https://res.cloudinary.com/dortdlynv/image/upload/v1725826902/placeholder_fl4mru.svg"
                    alt="Education concept"
                    width={384}
                    height={200}
                  />
                  <div className="absolute top-0 left-0 bg-yellow-400 text-blue-900 px-3 py-1 m-2 rounded-full text-sm font-bold shadow-md">
                    {lesson?.section}
                  </div>
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 m-2 rounded-full text-sm font-bold shadow-md">
                    {lesson?.isPaid ? "مدفوع" : "مجاني"}
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-blue-50">
                  <div className="flex items-center gap-2 space-x-2 ">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide shadow-sm">
                      الوحدة {lesson?.unit}
                    </span>
                    <div className="text-blue-600 text-xs uppercase font-semibold tracking-wide flex items-center">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {lesson?.classroom}
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl font-extrabold leading-tight text-blue-900">
                    {lesson?.title}
                  </h3>
                  <p className="mt-2 text-blue-700">{lesson?.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-blue-700">
                    <ThumbsUp className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">{lesson?.likes} لايك</span>
                  </div>
                  {!user ? (
                    ""
                  ) : lesson?.isPaid ? (
                    <div className="flex items-center justify-center h-[132px]">
                      <Button className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:from-orange-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transform transition duration-300 hover:scale-105">
                        اشتري الان
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-6 flex flex-col space-y-3">
                      <Link href={`/lessons/watch/${lesson?._id}`}>
                        <Button className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:from-orange-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transform transition duration-300 hover:scale-105">
                          شاهد الآن!
                        </Button>
                      </Link>
                      {lesson?.assignment && (
                        <Link href={`/lessons/assignements/${lesson?._id}`}>
                          <Button className="w-full px-6 py-3 bg-indigo-100 text-indigo-700 font-semibold rounded-full shadow-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-75 transition duration-300 flex items-center justify-center">
                            <ClipboardList className="w-5 h-5 ml-2" />
                            الواجب
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default LessonsByUnit;
