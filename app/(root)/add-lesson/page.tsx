"use client";

import AddLessonForm from "@/app/components/AddLessonForm";
import { redirect } from "next/navigation";

const AddLesson = () => {
  const user: any = localStorage.getItem("user");
  const userInfo = JSON.parse(user);
  if (!user) {
    redirect("/");
  }

  if (userInfo.user.type !== "teacher") {
    redirect("/");
  }
  return (
    <div className="flex mx-auto flex-col items-start justify-start max-w-3xl ">
      <div className="pt-10 pb-10">
        <h1 className="text-3xl font-bold text-black">اضافة درس للمنصة</h1>
      </div>
      <AddLessonForm />
    </div>
  );
};

export default AddLesson;
