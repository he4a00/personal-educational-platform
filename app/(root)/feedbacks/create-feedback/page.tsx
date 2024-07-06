"use client";

import AddLessonForm from "@/app/components/AddLessonForm";
import CreateFeedbackForm from "@/app/components/CreateFeedbackForm";
import { useUserContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

const CreateFeedback = () => {
  const { user }: any = useUserContext();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex mx-auto flex-col items-start justify-start max-w-3xl ">
      <div className="pt-10 pb-10">
        <h1 className="text-3xl font-bold text-black">ارسال اقتراح/مشكلة</h1>
      </div>
      <CreateFeedbackForm />
    </div>
  );
};

export default CreateFeedback;
