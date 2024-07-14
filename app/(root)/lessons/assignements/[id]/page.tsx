"use client";

import React, { useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import api from "@/app/utils/api";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import Image from "next/image";

const Assignment = () => {
  const { id } = useParams<{ id: string }>();
  const [questionList, setquestionList] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleClick = (isCorrect: boolean) => {
    if (isCorrect === true) {
      setScore(score + 1);
    }
    const nextQuestion = questionList + 1;
    if (nextQuestion < questions.length) {
      setquestionList(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const gotToNext = () => {
    let nextQuestion = questionList + 1;
    if (nextQuestion < questions.length) {
      setquestionList(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const goToPrevious = () => {
    let previousQuestion = questionList - 1;
    if (previousQuestion >= 0) {
      setquestionList(previousQuestion);
    }
  };

  const {
    data: assignments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const { data } = await api.get(`/assignment/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !assignments || assignments.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center p-3">
        <h1 className="text-3xl font-bold">
          عذرا ، لا يوجد أي واجبات متاحة لك.
        </h1>
      </div>
    );
  }

  const questions = assignments.reduce((acc: any, current: any) => {
    return acc.concat(current.questions);
  }, []);

  const currentQuestion = questions[questionList];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      {!showScore && currentQuestion ? (
        <div className="p-6 bg-white shadow-md rounded-md mb-8 w-full max-w-2xl">
          <div className="w-full mb-6">
            <Image
              height={400}
              width={400}
              className="w-full h-auto object-contain"
              alt=""
              src={currentQuestion.question.qImage}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.question.answers.map((answer: any, idx: any) => (
              <Button
                key={idx}
                onClick={() => handleClick(answer.isCorrect)}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
              >
                {answer.ansText}
              </Button>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Button
              onClick={goToPrevious}
              className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-500 focus:outline-none"
            >
              السابق
            </Button>
            <Button
              onClick={gotToNext}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            >
              التالي
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center flex flex-col">
          <h2 className="text-3xl font-bold">
            لديك {score} من {questions.length} إجابات صحيحة
          </h2>
          <Link href="/" className="p-5">
            <Button>الصفحة الرئيسية</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Assignment;
