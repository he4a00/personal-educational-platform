"use client";

import { sections } from "@/app/constants";
import Link from "next/link";
import { useParams } from "next/navigation";

const Sections = () => {
  const params = useParams<{ id: string }>();
  const classId = decodeURIComponent(params.id);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-10 w-full h-full items-center">
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
            <div key={sec.name}>
              <Link href={`/lessons/${classId}/sections/${sec.name}`}>
                <div className="flex flex-col items-center justify-center md:w-[34rem] w-80 h-80 bg-white shadow-2xl rounded-lg">
                  <h1 className="text-5xl font-bold text-center leading-tight">
                    {displayName}
                  </h1>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sections;
