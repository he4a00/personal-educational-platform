"use client";

import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { BookAIcon, Edit, View } from "lucide-react";
import DeleteExamButton from "@/app/components/DeleteExamButton";
import SwitchActiveButton from "@/app/components/SwitchActiveButton";
import { Skeleton } from "@/components/ui/skeleton";

interface Exam {
  _id: string;
  title: string;
  isActive: boolean;
}

const Exams = () => {
  const { data: exams, isLoading } = useQuery<Exam[]>({
    queryKey: ["exams"],
    queryFn: async () => {
      const { data } = await api.get("/exam/getAllExams");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-12 mb-4" />
        <Skeleton className="h-10 mb-4" />
        <Skeleton className="h-10 mb-4" />
        <Skeleton className="h-10 mb-4" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">قائمة الامتحانات</h1>
        <Link href="/dashboard/exams/add-exam">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            اضافة امتحان
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {exams?.map((exam) => (
          <div
            className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            key={exam._id}
          >
            <Label className="text-lg" htmlFor={exam?.title?.toLowerCase()}>
              {exam.title}
            </Label>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href={`/dashboard/exams/result/${exam?._id}`}>
                <BookAIcon />
              </Link>
              <Link href={`/dashboard/exams/add-exam/${exam?._id}`}>
                <Edit />
              </Link>
              <Link href={`/dashboard/exams/questions/${exam._id}`}>
                <View className="text-blue-600 hover:text-blue-800 cursor-pointer" />
              </Link>
              <SwitchActiveButton isActive={exam?.isActive} id={exam._id} />
              <DeleteExamButton id={exam._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
