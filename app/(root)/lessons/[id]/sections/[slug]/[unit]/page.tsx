"use client";

import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
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

interface LessonData {
  _id: string;
  title: string;
  isPaid: boolean;
  desc: string;
  price: string;
  unit: string;
  videoURL: string;
  classroom: string;
  section: string;
}

interface LessonProps {
  lessons: LessonData[];
}

const LessonsByUnit = () => {
  const params = useParams<{ slug: string; id: string; unit: string }>();
  const section = decodeURIComponent(params.slug);
  const classId = decodeURIComponent(params.id);
  const unit = decodeURIComponent(params.unit);

  const { user }: any = useUserContext();

  console.log(user);

  const {
    data: classLessons,
    isLoading,
    isError,
  } = useQuery<LessonProps, Error>({
    queryKey: ["classLessons"],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/lessons/classes/${section}/${unit}`);
        return data;
      } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to fetch lessons");
      }
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

              <Accordion type="single" collapsible>
                <AccordionItem value="item-0">
                  <AccordionTrigger className="font-semibold text-xl  p-4">
                    تفاصيل الدرس
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col bg-white opacity-90 p-5 shadow-lg w-[370px] md:w-[350px] relative bottom-5 rounded-lg">
                      <div className="flex items-center justify-center flex-col">
                        <h1 className="text-xl font-semibold p-2">
                          {lesson.title}
                        </h1>
                        <p className="p-2 font-semibold">{lesson.desc}</p>
                      </div>
                      <div className="flex flex-col gap-5 items-start">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>سعر الدرس</AccordionTrigger>
                            <AccordionContent>
                              {lesson.price}.00 جنيها
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                            <AccordionTrigger>الوحدة </AccordionTrigger>
                            <AccordionContent>
                              الوحدة {lesson.unit}
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-3">
                            <AccordionTrigger>الصف </AccordionTrigger>
                            <AccordionContent>
                              {lesson.classroom}
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-4">
                            <AccordionTrigger>القسم</AccordionTrigger>
                            <AccordionContent>
                              {lesson.section}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {user?.user?.type === "teacher" ? (
                <Link href={`/add-assignment/${lesson._id}`}>
                  <Button>اضافة واجب</Button>
                </Link>
              ) : (
                ""
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LessonsByUnit;
