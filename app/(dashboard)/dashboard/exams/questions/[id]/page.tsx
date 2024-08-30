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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

const Exams = () => {
  const { id } = useParams<{ id: string }>();
  const { data: examQuestions, isLoading } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const { data } = await api.get(`/exam/getQuestions/${id}`);
      return data;
    },
  });

  return (
    <div>
      <Table className="w-full table-auto">
        <TableCaption>قائمة بالأسئلة الأخيرة</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">نص السؤال</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                جاري التحميل ...
              </TableCell>
            </TableRow>
          ) : examQuestions.length > 0 ? (
            examQuestions.map((question: any, idx: number) => (
              <TableRow key={question._id}>
                <TableCell className="font-medium w-[15rem]">
                  <h1>{idx + 1}</h1>
                  <Image
                    width={450}
                    height={450}
                    alt=""
                    src={question.questionText}
                  />
                </TableCell>
                <TableCell align="right">
                  <Link
                    href={`/dashboard/exams/questions/add-answers/${question._id}`}
                  >
                    <Button>إضافة الاجابات</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                لا يوجد اسألة
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Exams;
