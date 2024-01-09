import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "../utils/api";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface Answer {
  ansText: string;
  isCorrect: boolean;
}

const AddAssignmentForm = () => {
  const [questions, setQuestions] = useState<string[]>([""]);
  const [answers, setAnswers] = useState<Answer[][]>([[]]);
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const handleQuestionChange = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = text;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    text: string
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex][answerIndex].ansText = text;
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
      try {
        const formattedFormData = {
          text: questions,
          answers: answers.map((answerArray) =>
            answerArray.map((answer) => ({
              ansText: answer.ansText,
              isCorrect: answer.isCorrect,
            }))
          ),
        };
        const { data } = await api.post(`/assignment/${id}`, formattedFormData);
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
            type="text"
            value={question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            placeholder={`Question ${index + 1}`}
            className="w-full px-3 py-2 border rounded-md"
          />
          {answers[index].map((answer, ansIndex) => (
            <div
              key={`answer-${index}-${ansIndex}`}
              className="flex items-center mb-2"
            >
              <input
                type="text"
                value={answer.ansText}
                onChange={(e) =>
                  handleAnswerChange(index, ansIndex, e.target.value)
                }
                placeholder={`Answer ${ansIndex + 1}`}
                className="w-full px-3 py-2 border rounded-md mr-2"
              />
              <label>
                Is Correct?
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={() => handleCheckboxChange(index, ansIndex)}
                  className="ml-2"
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addAnswer(index)}
            className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Answer
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addQuestion}
        className="mb-4 px-3 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Question
      </button>
      <button
        disabled={isPending}
        type="submit"
        className="px-3 py-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default AddAssignmentForm;
