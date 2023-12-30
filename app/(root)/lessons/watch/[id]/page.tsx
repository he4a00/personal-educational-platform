"use client";

import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";

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

const UnlockedLesson = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: unlockedLesson,
    isLoading,
    isError,
    error, // Capture error for debugging
  } = useQuery<LessonData, Error>({
    queryKey: ["classLessons", id],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/lessons/${id}`);
        return data;
      } catch (error: any) {
        throw new Error(`Failed to fetch lesson: ${error.message}`);
      }
    },
  });

  if (!unlockedLesson) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-2xl font-bold">عذرا ، لا يوجد اي دروس متاحة لك.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">{unlockedLesson?.title}</h1>
      </div>
      <div>
        <ReactPlayer
          width="100%"
          height="auto"
          url={unlockedLesson?.videoURL}
          controls={true}
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
    </div>
  );
};

export default UnlockedLesson;
