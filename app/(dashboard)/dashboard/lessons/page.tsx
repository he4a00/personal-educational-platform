"use client";

import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import SelectSorting from "@/app/components/SelectSorting";
import DeleteLessonButton from "@/app/components/Lessons/DeleteLessonButton";
import { EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Lesson = {
  title: string;
  classroom: string;
  unit: string;
  price: string;
  isPaid: boolean;
  _id: string;
  section: string;
  likes: number;
  assignment?: string;
};

const Users = () => {
  const [sortParam, setSortParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: lessonsData, isLoading } = useQuery({
    queryKey: ["lessons", sortParam, currentPage],
    queryFn: async () => {
      const { data } = await api.get(
        `/lessons/?classroom=${sortParam}&page=${currentPage}`
      );
      return data;
    },
  });

  return (
    <div className="p-5">
      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 gap-4">
        <SelectSorting setSortParam={setSortParam} />
        <Link href="/dashboard/lessons/add-lesson">
          <Button>اضافة درس</Button>
        </Link>
        <Link href="/dashboard/lessons/unlock-lesson">
          <Button>فتح درس</Button>
        </Link>
      </div>
      <Table className="w-full table-auto">
        <TableCaption>
          قائمة بالدروس الكلية علي المنصة لجميع الصفوف
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> عنوان الدرس</TableHead>
            <TableHead className="text-right"> القسم</TableHead>
            <TableHead className="text-right">الوحدة</TableHead>
            <TableHead className="text-right"> السعر</TableHead>
            <TableHead className="text-right"> عدد الاعجابات</TableHead>
            <TableHead className="text-right"> حالة الدرس</TableHead>
            <TableHead className="text-right"> العمليات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                جاري التحميل ...
              </TableCell>
            </TableRow>
          ) : lessonsData?.lessons?.length > 0 ? (
            lessonsData.lessons.map((lesson: Lesson) => (
              <TableRow key={lesson._id}>
                <TableCell className="text-right">{lesson.title}</TableCell>
                <TableCell className="text-right">{lesson.section}</TableCell>
                <TableCell className="text-right">{lesson.unit}</TableCell>
                <TableCell className="text-right">{lesson.price}</TableCell>
                <TableCell className="text-right">{lesson.likes}</TableCell>
                <TableCell className="text-right">
                  {lesson.isPaid ? "مدفوع" : "مجاني"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-5 items-center justify-center">
                    <DeleteLessonButton id={lesson?._id} />
                    <Link href={`/dashboard/lessons/edit/${lesson?._id}`}>
                      <EditIcon />
                    </Link>
                    <Link
                      href={`/dashboard/lessons/add-assignment/${lesson._id}`}
                    >
                      <Button disabled={lesson?.assignment ? true : false}>
                        اضافة واجب
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                لا يوجد دروس حالية
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-row gap-5 justify-center mt-10">
        <Button
          disabled={currentPage >= lessonsData?.totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          الصفحة التالية
        </Button>
        <Button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          الصفحة السابقة
        </Button>
      </div>
    </div>
  );
};

export default Users;
