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
      <Table className="w-full">
        <TableCaption>قائمة بالأسئلة الأخيرة</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">نص السؤال</TableHead>
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
            examQuestions.map((question: any) => (
              <TableRow key={question._id}>
                <TableCell className="font-medium w-[15rem]">
                  <Image
                    width={150}
                    height={150}
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
