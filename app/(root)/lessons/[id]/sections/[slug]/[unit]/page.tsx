"use client";

import api from "@/app/utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import algebra from "@/app/images/algebra.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  status: string;
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

              <div className="flex flex-col bg-white opacity-90 p-3 shadow-lg w-[370px] md:w-[350px] relative bottom-5 rounded-lg">
                <div className="flex flex-col gap-5 items-start">
                  <div className="p-4 w-full">
                    <h3 className="text-lg font-semibold mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{lesson.desc}</p>

                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-bold">سعر الدرس:</span>{" "}
                      {lesson.price} جنيها
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-bold">الوحدة:</span> {lesson.unit}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-bold">الصف:</span>{" "}
                      {lesson.classroom}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      <span className="font-bold">القسم:</span> {lesson.section}
                    </div>

                    <div className="flex justify-between items-center">
                      <span
                        className={`text-white px-3 py-1 rounded-full text-xs ${
                          lesson.status === "free"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {lesson.isPaid ? "مدفوع" : "مجاني"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center">
                {!user ? (
                  ""
                ) : lesson?.isPaid ? (
                  ""
                ) : (
                  <div className="flex flex-row items-center">
                    <Link href={`/lessons/watch/${lesson?._id}`}>
                      <Button className="m-5">مشاهدة</Button>
                    </Link>
                    {/* check if the  */}
                    {lesson?.assignment && (
                      <Link href={`/lessons/assignements/${lesson?._id}`}>
                        <Button className="bg-green-500 text-white hover:bg-green-600">
                          الواجب
                        </Button>
                      </Link>
                    )}
                  </div>
                )}

                {user?.user?.type === "teacher" ? (
                  <Link href={`/add-assignment/${lesson._id}`}>
                    <Button>اضافة واجب</Button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LessonsByUnit;
