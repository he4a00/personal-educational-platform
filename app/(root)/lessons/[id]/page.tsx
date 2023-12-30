"use client";

import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import algebra from "../../../images/algebra.jpg";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface LessonData {
  _id: string;
  title: string;
  isPaid: boolean;
  desc: string;
  price: string;
  unit: string;
  videoURL: string;
  classroom: string;
}

interface LessonProps {
  classroom: string;
  lessons: LessonData[];
}

const ClassLessons = () => {
  const params = useParams<{ id: string }>();
  const classId = decodeURIComponent(params.id);

  const {
    data: classLessons,
    isLoading,
    isError,
  } = useQuery<LessonProps, Error>({
    queryKey: ["classLessons", classId],
    queryFn: async () => {
      const { data } = await api.get(`/lessons/classes/${classId}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    ); // Show loading indicator while fetching data
  }

  if (isError || !classLessons || classLessons.lessons.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          عذراً، لا يوجد دروس متاحة لهذا الصف.
        </h1>
      </div>
    ); // Show an error message when there's an error or no lessons available
  }
  const lessonsArray = Array.isArray(classLessons)
    ? classLessons
    : [classLessons];

  return (
    <div className="flex items-center flex-col p-10">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        الدروس الخاصة ب{classId}
      </h2>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1 md:gap-x-80 gap-9 p-8 rounded-lg">
        {lessonsArray.map((classLesson: LessonProps) =>
          classLesson.lessons.map((lesson: LessonData) => (
            <div key={lesson._id} className="flex flex-col items-center">
              <Image
                alt=""
                width={350}
                height={300}
                src={algebra}
                className=" transition-all duration-500 hover:rotate-2 rounded-lg"
              />

              <div className="flex flex-col items-center bg-white opacity-90 p-5 shadow-lg w-[370px] md:w-[550px] relative bottom-5 rounded-lg">
                <h1 className="text-xl font-semibold p-2">{lesson.title}</h1>
                <p className="p-2 font-semibold">{lesson.desc}</p>
                <div className="flex flex-row gap-5">
                  <h4 className=" font-bold bg-red-300 p-3 rounded-lg">
                    {lesson.price}.00 جنيها
                  </h4>
                  <h4 className=" font-bold bg-blue-300 p-3 rounded-lg">
                    الوحدة {lesson.unit}
                  </h4>
                  <h4 className=" font-bold bg-green-300 p-3 rounded-lg">
                    {lesson.classroom}
                  </h4>
                </div>
                {/* <Button
                  disabled={lesson.isPaid === false}
                  className="m-5 w-full"
                >
                  مشاهدة
                </Button> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClassLessons;
