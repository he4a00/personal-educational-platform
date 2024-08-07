"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/api";
import { redirect, useParams } from "next/navigation";
import SaveExamScoreButton from "@/app/components/SaveExamScoreButton";
import { useUserContext } from "@/app/context/UserContext";
import Link from "next/link";
import Image from "next/image";

const ExamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number | null>>(
    []
  );
  const [score, setScore] = useState(0);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [isScoreSaved, setIsScoreSaved] = useState(false);
  const [dateTaken, setDateTaken] = useState(new Date());
  const [examLocked, setExamLocked] = useState(false);
  const { user }: any = useUserContext();
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const {
    data: examData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["examQuestions", id],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/exam/getExam/${id}`);
        return data;
      } catch (err: any) {
        if (err.response && err.response.status === 403) {
          setExamLocked(true);
        }
        throw err;
      }
    },
  });

  useEffect(() => {
    if (examData) {
      const savedTime = localStorage.getItem("remainingTime");
      const initialTime = savedTime
        ? parseInt(savedTime, 10)
        : examData.exam.durationInMinutes * 60 * 1000;
      setRemainingTime(initialTime);
      setSelectedAnswers(Array(examData.examQuestions.length).fill(null));
    }
  }, [examData]);

  useEffect(() => {
    if (remainingTime === 0 && !isExamFinished) return;

    if (remainingTime <= 0) {
      setIsExamFinished(true);
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0 || isExamFinished) {
          clearInterval(interval);
          return prevTime;
        }
        const newTime = prevTime - 1000;
        localStorage.setItem("remainingTime", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime, isExamFinished]);

  useEffect(() => {
    if (isExamFinished) {
      localStorage.removeItem("remainingTime");
    }
  }, [isExamFinished]);

  useEffect(() => {
    setDateTaken(new Date());
  }, []);

  if (examLocked) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-2xl font-bold">لقد اكملت هذا الامتحان بالفعل</h1>
      </div>
    );
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading exam data</div>;
  const { exam, examQuestions } = examData;

  if (!exam?.isActive) {
    redirect("/");
  }

  const questions = examQuestions;
  if (!questions) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-2xl font-bold">
          لا يوجد اسالة لهذا الامتحان حاليا
        </h1>
      </div>
    );
  }

  const handleAnswerClick = (isCorrect: any, answerIndex: any) => {
    const updatedAnswers = [...selectedAnswers];
    if (updatedAnswers[currentQuestion] !== null) {
      if (
        questions[currentQuestion].answers[updatedAnswers[currentQuestion]]
          .isCorrect &&
        !isCorrect
      ) {
        setScore(score - 1);
      } else if (
        !questions[currentQuestion].answers[updatedAnswers[currentQuestion]]
          .isCorrect &&
        isCorrect
      ) {
        setScore(score + 1);
      }
    } else if (isCorrect) {
      setScore(score + 1);
    }
    updatedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleNumberTable = (idx: any) => {
    setCurrentQuestion(idx);
  };

  const handlePreviousQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const minutes = Math.floor((remainingTime ?? 0) / 1000 / 60);
  const seconds = Math.floor(((remainingTime ?? 0) / 1000) % 60);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full container">
      <div className="bg-[#101012] p-12 w-full rounded-lg shadow-lg h-auto flex justify-center flex-col">
        {isScoreSaved ? (
          <div className="text-card-foreground text-xl font-bold mb-4 flex flex-col items-center gap-6 text-white">
            نتيجتك: {score} / {questions.length}
          </div>
        ) : (
          <>
            {isExamFinished ? (
              <div className="text-card-foreground text-xl font-bold mb-4 flex flex-col items-center gap-6">
                <SaveExamScoreButton
                  score={score}
                  dateTaken={dateTaken}
                  userId={user?.user?._id}
                  examId={id}
                  onSaveSuccess={() => setIsScoreSaved(true)}
                />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-muted-foreground gap-x-6">
                    سؤال {currentQuestion + 1} من {questions.length}
                  </div>
                  <div className="flex gap-x-4">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      السابق
                    </Button>
                    {currentQuestion === questions.length - 1 ? (
                      <Button
                        variant="outline"
                        disabled={currentQuestion !== questions.length - 1}
                        onClick={() => setIsExamFinished(true)}
                      >
                        تسليم
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleNextQuestion}
                        disabled={currentQuestion === questions.length - 1}
                      >
                        التالي
                      </Button>
                    )}
                  </div>
                </div>
                <div className="w-full mb-6">
                  <Image
                    height={400}
                    width={400}
                    className="w-full h-auto object-contain"
                    alt=""
                    src={questions[currentQuestion]?.questionText}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {questions[currentQuestion]?.answers.map(
                    (answer: any, index: any) => (
                      <Button
                        key={index}
                        className={`bg-white text-black font-semibold py-2 px-4 rounded-md shadow-md ${
                          selectedAnswers[currentQuestion] === index
                            ? "bg-green-400"
                            : ""
                        } `}
                        style={{
                          backgroundColor:
                            selectedAnswers[currentQuestion] === index
                              ? "#4ade80"
                              : "white",
                          color:
                            selectedAnswers[currentQuestion] === index
                              ? "black"
                              : "black",
                        }}
                        onClick={() =>
                          handleAnswerClick(answer.isCorrect, index)
                        }
                      >
                        {answer.answerText}
                      </Button>
                    )
                  )}
                </div>
              </>
            )}
            <div className="grid grid-cols-5 gap-2 p-5">
              {!isExamFinished && (
                <>
                  {questions?.map((_: any, index: number) => (
                    <Link
                      key={index}
                      href="#"
                      onClick={() => handleNumberTable(index)}
                      className={`p-2 ${
                        index === currentQuestion
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      } rounded text-center`}
                    >
                      {index + 1}
                    </Link>
                  ))}
                </>
              )}
            </div>
            <div className="flex justify-center mt-4 text-white">
              الوقت المتبقي: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExamDetails;
