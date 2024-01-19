"use client";

import MarkIsReadButton from "@/app/components/MarkIsReadButton";
import api from "@/app/utils/api";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface FeedbackProps {
  title: string;
  isRead: boolean;
  desc: string;
  _id: string;
}

const Feedbacks = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: feedbacks } = useQuery({
    queryKey: ["feedbacks", currentPage],
    queryFn: async (context: { queryKey: (string | number)[] }) => {
      const [, page] = context.queryKey;
      const { data } = await api.get(`/feedbacks/?page=${page}`);
      return data;
    },
  });

  const totalPages = feedbacks?.totalPages;

  return (
    <div className="container">
      <h3 className="text-3xl p-4 text-center font-bold">الاقتراحات/المشاكل</h3>
      {feedbacks?.feedbacks.map((fb: FeedbackProps) => {
        return (
          <div className="flex flex-col p-4" key={fb._id}>
            <div className="flex flex-col p-4 w-full bg-gray-300">
              <h1 className="text-xl font-semibold p-2">
                عنوان المشكلة/الاقتراح:{fb?.title}
              </h1>
              <p className="font-semibold text-xl p-2 break-words">
                تفاصيل المشكلة/الاقتراح:{fb?.desc}
              </p>
              <MarkIsReadButton
                feedbackId={fb._id}
                text="تم قرائته"
                isRead={fb.isRead}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feedbacks;
