import { z } from "zod";

export const ExamValidation = z.object({
  title: z.string(),
  eduyear: z.string(),
});

export const QuestionsValidator = z.object({
  questions: z.array(
    z.object({
      questionText: z.string(),
    })
  ),
});
