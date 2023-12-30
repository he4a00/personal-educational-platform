import { z } from "zod";

export const UnlockedLessonValidation = z.object({
  userId: z.string(),
  lessonId: z.string(),
});

export const UnlockForAllValidation = z.object({
  lessonId: z.string(),
});
