import * as z from "zod";

const dispatchFormSchema = z.object({
  materialDispatchDate: z.coerce.date(),
  materialRecievedDate: z.coerce.date(),
  paymentTerms: z.string(),
  tentaiveComissionhDate: z.coerce.date(),
});

type DispatchFormInput = z.infer<typeof dispatchFormSchema>;
