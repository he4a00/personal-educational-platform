"use client";

import AddExamAnswersForm from "@/app/components/AddExamAnswersForm";
import { useUserContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

const AddAnswers = () => {
  const { user }: any = useUserContext();

  if (!user) {
    redirect("/");
  }

  if (user?.user?.type !== "teacher") {
    redirect("/");
  }
  return (
    <div className="flex mx-auto flex-col items-start justify-start max-w-3xl ">
      <div className="pt-10 pb-10">
        <h1 className="text-3xl font-bold text-black">
          اضافة الاجابات للاسالة
        </h1>
      </div>
      <AddExamAnswersForm />
    </div>
  );
};

export default AddAnswers;
