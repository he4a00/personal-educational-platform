"use client";

import { units } from "@/app/constants";
import Link from "next/link";
import { useParams } from "next/navigation";

const SectionWithUnits = () => {
  const params = useParams<{ slug: string; id: string }>();
  const section = decodeURIComponent(params.slug);
  const classId = decodeURIComponent(params.id);
  return (
    <div className="pt-12">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
        {units?.map((unit: any) => {
          return (
            <div key={unit.name}>
              <Link
                href={`/lessons/${classId}/sections/${section}/${unit.name}`}
                className="hover:text-2xl transition-all"
              >
                <div
                  className="flex items-center justify-center p-5 bg-white text-2xl font-semibold rounded-lg h-36 drop-shadow-2xl"
                  key={unit.name}
                >
                  الوحدة {unit.name}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionWithUnits;
