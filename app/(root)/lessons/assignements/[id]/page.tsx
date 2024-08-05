"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import api from "@/app/utils/api";
import { Button } from "@/components/ui/button";
import Loader from "@/app/components/Loader";
import Image from "next/image";
import Link from "next/link";

type UserAnswer = {
  questionIndex: number;
  answerIndex: number;
  isCorrect: boolean;
};
const Assignment = () => {
  const { id } = useParams<{ id: string }>();

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [clicked, setClicked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );

  // Fetch assignments data
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

  // Handler Functions
  const handleAnswerClick = (isCorrect: boolean, answerIndex: number) => {
    if (!clicked) {
      if (isCorrect) {
        setScore(score + 1);
      }
    }
    setUserAnswers([
      ...userAnswers,
      { questionIndex: currentQuestionIndex, answerIndex, isCorrect },
    ]);

    setClicked(true);
    setSelectedAnswerIndex(answerIndex);
    // const nextQuestion = currentQuestionIndex + 1;
    // if (nextQuestion < questions.length) {
    //   setCurrentQuestionIndex(nextQuestion);
    // } else {
    //   setShowScore(true);
    // }
  };

  const goToNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setClicked(false);
    } else {
      setShowScore(true);
    }
  };

  const goToPreviousQuestion = () => {
    const previousQuestion = currentQuestionIndex - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestionIndex(previousQuestion);
      setClicked(false);
    }
  };

  if (isLoading) return <Loader />;

  if (isError || !assignments || assignments.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center p-3">
        <h1 className="text-3xl font-bold">
          عذرا ، لا يوجد أي واجبات متاحة لك.
        </h1>
      </div>
    );
  }

  // Flatten questions from all assignments
  const questions = assignments.reduce(
    (acc: any, current: any) => acc.concat(current.questions),
    []
  );
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      {!showScore ? (
        <QuestionView
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onAnswerClick={handleAnswerClick}
          onNextClick={goToNextQuestion}
          onPreviousClick={goToPreviousQuestion}
          clicked={clicked}
          selectedAnswerIndex={selectedAnswerIndex}
        />
      ) : (
        <SummaryView
          questions={questions}
          userAnswers={userAnswers}
          score={score}
        />
      )}
    </div>
  );
};

// Sub-Component for Question View
const QuestionView = ({
  question,
  questionIndex,
  totalQuestions,
  onAnswerClick,
  onNextClick,
  onPreviousClick,
  clicked,
  selectedAnswerIndex,
}: any) => {
  return (
    <div className="p-6 bg-[#101012] shadow-md rounded-md mb-8 w-full max-w-2xl">
      <div className="w-full mb-6">
        <Image
          height={400}
          width={400}
          className="w-full h-auto object-contain"
          alt=""
          src={question.question.qImage}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {question.question.answers.map((answer: any, idx: any) => (
          <Button
            key={idx}
            onClick={() => onAnswerClick(answer.isCorrect, idx)}
            className={`bg-white text-black font-semibold py-2 px-4 rounded-md shadow-md hover:bg-slate-400  focus:outline-none ${
              clicked && idx === selectedAnswerIndex ? "bg-green-400" : ""
            } `}
          >
            {answer.ansText}
          </Button>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <Button
          onClick={onPreviousClick}
          className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-500 focus:outline-none"
        >
          السابق
        </Button>
        <Button
          onClick={onNextClick}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
        >
          التالي
        </Button>
      </div>
    </div>
  );
};

// Sub-Component for Summary View
const SummaryView = ({ questions, userAnswers, score }: any) => {
  return (
    <div className="text-center flex flex-col">
      <div className="border border-gray-300 p-6 bg-[#101012] rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-white">ملخص الإجابات</h2>
        {questions.map((question: any, idx: any) => {
          const userAnswer = userAnswers.find(
            (ans: any) => ans.questionIndex === idx
          );
          const correctAnswer = question.question.answers.find(
            (ans: any) => ans.isCorrect
          );
          return (
            <div key={idx} className="mb-4 p-4 border rounded-md">
              <div className="mb-2">
                <Image
                  height={200}
                  width={200}
                  className="w-full h-auto object-contain"
                  alt=""
                  src={question.question.qImage}
                />
              </div>

              <div
                className={`text-lg ${
                  userAnswer?.isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                <strong>إجابتك:</strong>{" "}
                {question.question.answers[userAnswer?.answerIndex]?.ansText}
              </div>
              {!userAnswer?.isCorrect && (
                <div className="text-lg text-green-600">
                  <strong>الإجابة الصحيحة:</strong> {correctAnswer?.ansText}
                </div>
              )}
            </div>
          );
        })}
        <div className="mt-6 mb-6">
          <h1 className="text-white">
            <strong>النتيجة:</strong> {score} / {questions.length}
          </h1>
        </div>
        <Link className="mb-5" href="/">
          <Button>الصفحة الرئيسية</Button>
        </Link>
      </div>
    </div>
  );
};

export default Assignment;
