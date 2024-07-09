"use client";

import Loader from "@/app/components/Loader";
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-4">
          {unlockedLesson?.title}
        </h1>
        <div className="flex justify-center mb-4">
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
        <p className="text-lg text-gray-700 text-center">
          {unlockedLesson?.desc}
        </p>
      </div>
    </div>
  );
};

export default UnlockedLesson;
