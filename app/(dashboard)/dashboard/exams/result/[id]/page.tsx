"use client";

import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ExamResult = () => {
  const { id } = useParams<{ id: string }>();
  const { data: examResults, isLoading } = useQuery({
    queryKey: ["examResult"],
    queryFn: async () => {
      const { data } = await api.get(`/exam/results/${id}`);
      return data;
    },
  });

  return (
    <div>
      <Table className="w-full table-auto">
        <TableCaption>قائمة بدرجات الطلاب الخاصة بهذا الاختبار</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">الاسم الاول</TableHead>
            <TableHead className="text-right">الاسم الثاني</TableHead>
            <TableHead className="text-right">النتيجة</TableHead>
            <TableHead className="text-right">تاريخ التسليم</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                جاري التحميل ...
              </TableCell>
            </TableRow>
          ) : examResults?.length > 0 ? (
            examResults.map((result: any) => {
              const formattedDate = new Intl.DateTimeFormat("ar", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(result.dateTaken));
              return (
                <TableRow key={result._id}>
                  <TableCell className="text-right">
                    {result.userId.firstname}
                  </TableCell>
                  <TableCell className="text-right">
                    {result.userId.lastname}
                  </TableCell>
                  <TableCell className="text-right">{result.score}</TableCell>
                  <TableCell className="text-right">{formattedDate}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                لا يوجد درجات في الوقت الحالي
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamResult;
