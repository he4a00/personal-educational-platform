"use client";

import { sections } from "@/app/constants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Beaker, PlusSquareIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const Sections = () => {
  const params = useParams<{ id: string }>();
  const classId = decodeURIComponent(params.id);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-6xl overflow-hidden shadow-xl">
        <CardHeader className="bg-white bg-opacity-90 backdrop-blur-sm p-6 md:p-8">
          <CardTitle className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-2">
            اختر القسم الذي تريده
          </CardTitle>
          <CardDescription className="text-center text-gray-600 text-lg md:text-xl">
            اختر القسم لعرض الدروس الخاصة بهذا القسم
          </CardDescription>
        </CardHeader>

        {/* Adjusting grid layout to ensure two columns and bigger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          {sections.map((sec, idx) => {
            // Determine the section name based on classId and section name
            let displayName = sec.name;

            if (classId === "الصف الثالث الاعدادي") {
              if (sec.name === "هندسة") {
                displayName = "هندسة و حساب المثلثات";
              } else if (sec.name === "جبر") {
                displayName = "جبر وأحصاء";
              }
            }

            return (
              <Link
                key={sec.name}
                href={`/lessons/${classId}/sections/${sec.name}`}
              >
                <Card className="relative h-44 overflow-hidden border bg-gradient-to-br border-gray-200 from-blue-100 to-green-100 hover:from-blue-200 hover:to-green-20 ">
                  <CardHeader className="flex flex-col items-center p-10">
                    <CardTitle className="text-3xl font-semibold text-center">
                      {displayName}
                    </CardTitle>
                    <div className="top-10 right-0 absolute p-6">
                      <PlusSquareIcon className="w-28 h-28 opacity-30 p-7" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Sections;
