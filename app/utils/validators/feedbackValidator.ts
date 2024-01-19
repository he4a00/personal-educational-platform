import { z } from "zod";

export const FeedbackValidator = z.object({
  title: z.string(),
  desc: z.string(),
});
