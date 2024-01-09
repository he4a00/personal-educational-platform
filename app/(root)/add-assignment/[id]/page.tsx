"use client";

import AddAssignmentForm from "@/app/components/AddAssignmentForm";
import { useUserContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

const AddAssignment = () => {
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
        <h1 className="text-3xl font-bold text-black">اضافة واجب للدرس</h1>
      </div>
      <AddAssignmentForm />
    </div>
  );
};

export default AddAssignment;
