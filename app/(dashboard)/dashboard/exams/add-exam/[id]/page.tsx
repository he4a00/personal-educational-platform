"use client";

import AddQToExam from "@/app/components/AddQToExam";
import React from "react";

const page = () => {
  return (
    <div className="flex mx-auto flex-col items-start justify-start max-w-3xl h-screen">
      <div className="pt-10 pb-10">
        <h1 className="text-3xl font-bold text-black">اضافة أسالة الامتحان </h1>
      </div>
      <AddQToExam />
    </div>
  );
};

export default page;
