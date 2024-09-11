"use client";

import EditLessonForm from "@/app/components/Lessons/EditLessonForm";
import Loader from "@/app/components/Loader";
import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const EditLesson = () => {
  const { id: lessonId } = useParams<{ id: string }>();
  const {
    data: lessonData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["lessonData"],
    queryFn: async () => {
      const { data } = await api.get(`/lessons/${lessonId}`);
      return data;
    },
  });

  if (isLoading || isFetching) {
    <Loader />;
  }

  return (
    <>
      <EditLessonForm
        lessonId={lessonId}
        classroom={lessonData?.classroom}
        desc={lessonData?.desc}
        isPaid={lessonData?.idPaid}
        price={lessonData?.price}
        section={lessonData?.section}
        title={lessonData?.title}
        unit={lessonData?.unit}
      />
    </>
  );
};

export default EditLesson;
