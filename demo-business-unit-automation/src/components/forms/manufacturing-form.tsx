import * as z from "zod";

const manufacturingFormSchema = z.object({
  productionStartDate: z.coerce.date(),
  productionEndDate: z.coerce.date(),
  rawMaterialsUsed: z.string(),
  qualityControlCheck: z.boolean(),
  supervisor: z.string(),
});

type ManufacturingFormInput = z.infer<typeof manufacturingFormSchema>;
