import { z } from "zod";

export const LessonValidation = z.object({
  title: z.string().min(3, { message: "Minimum 3 characters." }),
  classroom: z.string(),
  videoURL: z.string(),
  unit: z.string(),
  price: z.string(),
  isPaid: z.boolean(),
  desc: z.string(),
  section: z.string(),
});
