"use client";

import Likes from "@/app/components/Likes";
import Loader from "@/app/components/Loader";
import RelatedLessons from "@/app/components/RelatedLessons";
import ToggleLike from "@/app/components/ToggleLike";
import { useUserContext } from "@/app/context/UserContext";
import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { redirect, useParams } from "next/navigation";
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

  const { user }: any = useUserContext();

  if (!user?.user) {
    redirect("/");
  }

  const { data: unlockedLesson, isLoading } = useQuery<LessonData, Error>({
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

  if (isLoading) {
    return <Loader />;
  }
  if (!unlockedLesson) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-2xl font-bold">عذرا ، لا يوجد اي دروس متاحة لك.</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
      <div className="space-y-6">
        <div className="relative aspect-video rounded-lg overflow-hidden">
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
          <div className="text-lg font-medium line-clamp-2 p-4">
            {unlockedLesson?.title}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ToggleLike lessonId={id} />
          <Likes lessonId={id} />
        </div>
      </div>
      <RelatedLessons
        id={id}
        classroom={decodeURIComponent(unlockedLesson?.classroom)}
      />
    </div>
  );
};

export default UnlockedLesson;
