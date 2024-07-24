"use client";

import AddExamForm from "@/app/components/AddExamForm";
import { useUserContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

const AddExam = () => {
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
        <h1 className="text-3xl font-bold text-black">اضافة امتحان </h1>
      </div>
      <AddExamForm />
    </div>
  );
};

export default AddExam;
