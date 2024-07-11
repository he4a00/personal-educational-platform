import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "../utils/api";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

interface Answer {
  ansText: string;
  isCorrect: boolean;
}

const AddAssignmentForm = () => {
  const [questions, setQuestions] = useState<string[]>([""]);
  const [answers, setAnswers] = useState<Answer[][]>([[]]);
  const [questionImages, setQuestionImages] = useState<File[]>([]);
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const handleQuestionChange = (index: number, qImage: string) => {
    const updatedImages = [...questionImages];
    updatedImages[index] = qImage;
    setQuestionImages(updatedImages);
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    qImage: string
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex][answerIndex].ansText = qImage;
    setAnswers(updatedAnswers);
  };

  const handleCheckboxChange = (questionIndex: number, answerIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex][answerIndex].isCorrect =
      !updatedAnswers[questionIndex][answerIndex].isCorrect;
    setAnswers(updatedAnswers);
  };

  const { mutate: createAssignment, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      questionImages.forEach((image, index) => {
        formData.append(`qImage_${index}`, image);
      });
      formData.append(
        "data",
        JSON.stringify({
          answers: answers.map((answerArray) =>
            answerArray.map((answer) => ({
              ansText: answer.ansText,
              isCorrect: answer.isCorrect,
            }))
          ),
        })
      );

      try {
        const { data } = await api.post(`/assignment/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return data;
      } catch (error: any) {
        console.log(error);
      }
    },
    onSuccess: () => {
      toast({
        title: "تم اضافة الاسالة لهذا الدرس بنجاح",
        variant: "default",
      });
    },
    onError: (error: any) => {
      console.error("Error:", error);
    },
  });
  const addQuestion = () => {
    setQuestions([...questions, ""]);
    setAnswers([...answers, []]);
  };

  const addAnswer = (questionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = [
      ...updatedAnswers[questionIndex],
      { ansText: "", isCorrect: false },
    ];
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAssignment();
  };

  return (
    <form
      className="max-w-md mx-auto p-4 border rounded-md"
      onSubmit={handleSubmit}
    >
      {questions.map((question, index) => (
        <div key={`question-${index}`} className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleQuestionChange(index, e.target.files?.[0] as File)
            }
            className="w-full px-3 py-2 border rounded-md"
          />
          {answers[index].map((answer, ansIndex) => (
            <div
              key={`answer-${index}-${ansIndex}`}
              className="flex flex-row gap-5 p-5"
            >
              <Input
                type="text"
                value={answer.ansText}
                onChange={(e) =>
                  handleAnswerChange(index, ansIndex, e.target.value)
                }
                placeholder={`الاجابة ${ansIndex + 1}`}
                className="w-full px-3 py-2 border rounded-md mr-2"
              />

              <Input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={() => handleCheckboxChange(index, ansIndex)}
              />
            </div>
          ))}
          <Button
            type="button"
            onClick={() => addAnswer(index)}
            className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            اضافة اجابة
          </Button>
        </div>
      ))}
      <div className="flex flex-row gap-5">
        <Button type="button" onClick={addQuestion}>
          اضافة سؤال
        </Button>
        <Button disabled={isPending} type="submit">
          تسجيل
        </Button>
      </div>
    </form>
  );
};

export default AddAssignmentForm;
