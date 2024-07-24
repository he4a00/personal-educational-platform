"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/api";
import { useParams } from "next/navigation";
import SaveExamScoreButton from "@/app/components/SaveExamScoreButton";
import { useUserContext } from "@/app/context/UserContext";
import Link from "next/link";

const ExamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [isScoreSaved, setIsScoreSaved] = useState(false);
  const [dateTaken, setDateTaken] = useState(new Date());
  const [examLocked, setExamLocked] = useState(false);
  const { user }: any = useUserContext();

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
          console.log("error");
          setExamLocked(true);
        }
        throw err;
      }
    },
  });

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
  if (!examData?.data?.questions) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-2xl font-bold">
          لا يوجد اسالة لهذا الامتحان حاليا
        </h1>
      </div>
    );
  }

  const { exam, examQuestions } = examData;
  const questions = examQuestions;

  const handleAnswerClick = (isCorrect: any) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer(isCorrect);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsExamFinished(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handlePreviousQuestion = () => {
    setSelectedAnswer(null);
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full container">
      <div className="bg-card p-12 w-full rounded-lg shadow-lg h-auto flex justify-center flex-col">
        {isScoreSaved ? (
          <div className="text-card-foreground text-xl font-bold mb-4 flex flex-col items-center gap-6">
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
                    <Button
                      variant="outline"
                      onClick={handleNextQuestion}
                      disabled={currentQuestion === questions.length - 1}
                    >
                      التالي
                    </Button>
                  </div>
                </div>
                <div className="text-card-foreground text-xl font-bold mb-4">
                  {questions[currentQuestion]?.questionText}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {questions[currentQuestion]?.answers.map(
                    (answer: any, index: any) => (
                      <Button
                        key={index}
                        variant={
                          selectedAnswer === index ? "default" : "outline"
                        }
                        onClick={() => handleAnswerClick(answer.isCorrect)}
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
                      onClick={() => setCurrentQuestion(index)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ExamDetails;
