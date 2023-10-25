import * as z from "zod";

export const meetingFormSchema = z.object({
  title: z.string().min(3).max(50),
  agenda: z.string().max(300),
  date: z.string(),
  startTime: z.string(),
  location: z.string().min(3).max(50),
});


