import * as z from "zod";

const serviceCallFormSchema = z.object({
  siteEngineer: z.string(),
  siteLocation: z.string(),
  sitePersonName: z.string(),
  sitePersonNumber: z.string(),
});

type ServiceFormInput = z.infer<typeof serviceCallFormSchema>;
