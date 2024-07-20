"use client";
import UnlockForAll from "@/app/components/UnlockForAll";
import UnlockLesson from "@/app/components/UnlockLesson";
import { useUserContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

const AddLesson = () => {
  const { user }: any = useUserContext();
  if (!user) {
    redirect("/");
  }

  if (user?.user?.type !== "teacher") {
    redirect("/");
  }
  return (
    <div className="flex mx-auto flex-col max-w-3xl ">
      <div className="pt-10 pb-10">
        <h1 className="text-3xl font-bold text-black">اضافة الدرس للطالب</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <UnlockLesson />
        <UnlockForAll />
      </div>
    </div>
  );
};

export default AddLesson;
