import { z } from "zod";

export const ExamValidation = z.object({
  title: z.string(),
  eduyear: z.string(),
  section: z.string(),
  maxScore: z.number().default(15),
});

export const QuestionsValidator = z.object({
  questions: z.array(
    z.object({
      questionText: z.string(),
    })
  ),
});

export const AnswersValidation = z.object({
  answers: z.array(
    z.object({
      answerText: z.string(),
      isCorrect: z.boolean(),
    })
  ),
});
