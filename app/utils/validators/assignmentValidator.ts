import * as z from "zod";

const AnswerSchema = z.object({
  ansText: z.string(),
  isCorrect: z.boolean(),
});

const QuestionSchema = z.object({
  text: z.string(),
  answers: z.array(AnswerSchema).min(4).max(4), // Ensure exactly four answers
});

const AssignmentValidator = z.object({
  // other fields...
  questions: z.array(QuestionSchema),
});

export { AssignmentValidator };
