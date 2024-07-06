import { z } from "zod";

export const UnlockedLessonValidation = z.object({
  phoneNumber: z.string(),
  title: z.string(),
});

export const UnlockForAllValidation = z.object({
  lessonId: z.string(),
});
