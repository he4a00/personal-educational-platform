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
    <div className="container mx-auto p-4">
      <h3 className="text-3xl p-4 text-center font-bold mb-8">
        الاقتراحات/المشاكل
      </h3>
      <div className="space-y-6">
        {feedbacks?.feedbacks.map((fb: FeedbackProps) => (
          <div key={fb._id} className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">
              عنوان المشكلة/الاقتراح: {fb?.title}
            </h1>
            <p className="text-lg mb-4">تفاصيل المشكلة/الاقتراح: {fb?.desc}</p>
            <MarkIsReadButton
              feedbackId={fb._id}
              text="تم قرائته"
              isRead={fb.isRead}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          السابق
        </Button>
        <span className="text-lg font-semibold">
          {currentPage} من {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          التالي
        </Button>
      </div>
    </div>
  );
};

export default Feedbacks;
