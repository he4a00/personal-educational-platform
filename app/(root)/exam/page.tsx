"use client";

import Loader from "@/app/components/Loader";
import NoDataFound from "@/app/components/NoDataFound";
import api from "@/app/utils/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type ExamProps = {
  _id: string;
  title: string;
  eduyear: string;
  dateCreated: Date;
  isActive: boolean;
};

const Exams = () => {
  const {
    data: allExams,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const { data } = await api.get("/exam/getAllExams");
      return data;
    },
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }
  if (!allExams || allExams.length === 0) {
    return (
      <NoDataFound
        mainText="لا يوجد امتحانات في هذه اللحظة"
        subText="يبدو انه لا يوجد امتحانات في هذه اللحظة ، برجاء التحقق من الصفحة مرة اخري او بعد مدة."
      />
    );
  }

  return (
    <section className="py-12 md:py-20 lg:py-28">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">الامتحانات المتاحة</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allExams?.map((exam: ExamProps) => {
            const foramtedDate = new Intl.DateTimeFormat("ar", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(exam.dateCreated));

            return (
              <Card key={exam._id}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col gap-y-2">
                    <h3 className="text-lg font-semibold">{exam?.title}</h3>
                    <p className="text-muted-foreground">{exam?.eduyear}</p>
                    <p className="text-muted-foreground">{foramtedDate}</p>
                    {exam?.isActive && (
                      <Link className="mt-5" href={`/exam/${exam?._id}`}>
                        <Button disabled={!exam?.isActive}>دخول</Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Exams;
