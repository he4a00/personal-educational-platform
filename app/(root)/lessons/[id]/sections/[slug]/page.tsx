"use client";

import { units } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";

const SectionWithUnits = () => {
  const params = useParams<{ slug: string; id: string }>();
  const section = decodeURIComponent(params.slug);
  const classId = decodeURIComponent(params.id);

  return (
    <div className="pt-60 md:pt-0 w-full h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
        {units?.map((unit: any) => (
          <Card
            key={unit.name}
            className="overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-10 relative"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-bold text-white group-hover:underline text-center">
                الوحدة {unit.name}
              </CardTitle>
            </CardHeader>
            <CardFooter className="relative z-10">
              <Button
                asChild
                className="w-full bg-white text-indigo-600 hover:bg-indigo-100 transition-colors"
              >
                <Link
                  href={`/lessons/${classId}/sections/${section}/${unit.name}`}
                >
                  ابدأ الان
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SectionWithUnits;
