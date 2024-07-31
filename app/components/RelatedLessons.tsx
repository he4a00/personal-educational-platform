"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../utils/api";
import ReactPlayer from "react-player";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const RelatedLessons = ({
  classroom,
  id,
}: {
  classroom: string;
  id: string;
}) => {
  const {
    data: relatedLessons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["relatedLessons", classroom],
    queryFn: async () => {
      const { data } = await api.get(
        `/lessons/related/${encodeURIComponent(classroom)}`
      );
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading related lessons</div>;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b border-gray-300 p-3">
          الدروس المتعلقة بهذا الموضوع
        </h2>
        <div className="grid gap-4">
          {relatedLessons?.map((lesson: any) => (
            <div key={lesson._id} className="flex gap-4">
              <div className="relative w-[120px] h-[68px] rounded-lg overflow-hidden">
                {lesson._id === id ? (
                  <div className="cursor-not-allowed opacity-70">
                    <Loader2 className="absolute top-5 animate-spin right-11" />
                    <ReactPlayer
                      width="100%"
                      height="auto"
                      url={lesson?.videoURL}
                      controls={false}
                      light={false}
                      config={{
                        file: {
                          attributes: {
                            controlsList: "nodownload",
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <Link href={`/lessons/watch/${lesson?._id}`}>
                    <ReactPlayer
                      width="100%"
                      height="auto"
                      url={lesson?.videoURL}
                      controls={false}
                      light={false}
                      config={{
                        file: {
                          attributes: {
                            controlsList: "nodownload",
                          },
                        },
                      }}
                    />
                  </Link>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium line-clamp-2">
                  {lesson.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedLessons;
