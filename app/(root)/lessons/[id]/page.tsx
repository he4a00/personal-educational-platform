"use client";

import { sections } from "@/app/constants";
import Link from "next/link";
import { useParams } from "next/navigation";

const Sections = () => {
  const params = useParams<{ id: string }>();
  const classId = decodeURIComponent(params.id);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center mt-10">اختر القسم</h1>
      <div className="flex flex-col md:flex-row justify-center gap-10 w-full h-full items-center">
        {sections.map((sec, idx) => {
          return (
            <div key={sec.name}>
              <Link key={idx} href={`/lessons/${classId}/sections/${sec.name}`}>
                <div className="flex flex-col items-center justify-center md:w-[34rem] w-80 h-80 bg-white shadow-2xl rounded-lg p-10">
                  <h1 className="text-5xl font-bold">{sec.name}</h1>
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
