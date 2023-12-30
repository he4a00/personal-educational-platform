"use client";
import UnlockForAll from "@/app/components/UnlockForAll";
import UnlockLesson from "@/app/components/UnlockLesson";
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
    <div className="flex mx-auto flex-col max-w-3xl ">
      <div className="pt-10 pb-10">
        <h1 className="text-3xl font-bold text-black">اضافة الدرس للطالب</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <UnlockLesson />
        <UnlockForAll />
      </div>
    </div>
  );
};

export default AddLesson;
