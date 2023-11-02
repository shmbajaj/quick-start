import * as z from "zod";
import DesignForm from "@/components/forms/design-form";
import DispatchForm from "@/components/forms/dispatch-form";
import ManufacturingForm from "@/components/forms/manufacturing-form";
import ServiceCallForm from "@/components/forms/service-call-form";
import { Button } from "@/components/ui/button";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

// TODO: use the below constraints/refine
export const DemoFormSchema = z.object({
  jobID: z
    .string()
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The jobID must contain only letters, numbers and underscore (_)"
    ),
  model: z.string().min(3).max(50),
  client: z.string().min(3).max(25),
  product: z.string().min(3).max(50),
  siteAddress: z.string().min(10).max(100),
  contactPerson: z.string().min(3).max(23),
  payment: z.number().min(0).max(100),
  productionStartDate: z.coerce.date().max(new Date(), {
    message: "Production Start Date must be in the past",
  }),
  productionEndDate: z.coerce.date(),
  rawMaterialsUsed: z.string().min(3).max(200),
  qualityControlCheck: z.coerce.boolean(),
  supervisor: z.string().min(3).max(27),
  materialDispatchDate: z.coerce.date(),
  materialRecievedDate: z.coerce.date().max(new Date(), {
    message: "Production Start Date must be in the past",
  }),
  paymentTerms: z.string(),
  tentaiveComissionhDate: z.coerce.date(),
  siteEngineer: z
    .string()
    .min(4, {
      message: "The site engineer name must be 4 characters or more",
    })
    .max(27, {
      message: "The site engineer name must be 27 characters or less",
    })
    .regex(/^[a-zA-Z]+$/, "The site engineer name must contain only letters"),
  siteLocation: z
    .string()
    .min(4, { message: "The site location must be 4 characters or more" })
    .max(120, {
      message: "The site location must be 120 characters or less",
    }),
  sitePersonName: z
    .string()
    .min(4, { message: "The site person name must be 4 characters or more" })
    .max(27, {
      message: "The site person name must be 27 characters or less",
    })
    .regex(/^[a-zA-Z]+$/, "The site person name must contain only letters"),
  sitePersonNumber: z
    .string()
    .min(10, {
      message: "The site person number must be 10 characters",
    })
    .max(10, {
      message: "The site person number must be 10 characters",
    })
    .regex(/^[6-9]\d{9}$/, "The site person number must contain numbers"),
});
// .refine((data) => data.productionEndDate > data.productionStartDate, {
//   message:
//     "Production End date must be greater than the Production Start Date',",
//   path: ["productionEndDate"],
// })
// .refine((data) => data.materialDispatchDate > data.materialRecievedDate);

export type DemoFormInput = z.infer<typeof DemoFormSchema>;

export default function DemoMultiStepForm() {
  const form = useForm<DemoFormInput>({
    resolver: zodResolver(DemoFormSchema),
    defaultValues: {
      jobID: "",
      model: "",
      client: "",
      product: "",
      siteAddress: "",
      contactPerson: "",
      payment: 0,
      productionStartDate: new Date(),
      productionEndDate: new Date(),
      rawMaterialsUsed: "",
      qualityControlCheck: true,
      supervisor: "",
      materialDispatchDate: new Date(),
      materialRecievedDate: new Date(),
      paymentTerms: "",
      tentaiveComissionhDate: new Date(),
      siteEngineer: "",
      siteLocation: "",
      sitePersonName: "",
      sitePersonNumber: "",
    },
  });
  // TODO: make the below repeating process Declarative
  const {
    next,
    back,
    step,
    totalSteps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm([
    <DesignForm control={form.control} />,
    <ManufacturingForm control={form.control} />,
    <DispatchForm control={form.control} />,
    <ServiceCallForm control={form.control} />,
  ]);
  return (
    <div className="relative max-w-4xl m-auto">
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit((designFormData) =>
            console.log({ designFormData })
          )}
        >
          <div className="absolute top-2 right-2">
            {currentStepIndex + 1} / {totalSteps}
          </div>
          <div className="flex flex-col">
            {step}
            <div className="flex justify-between p-10 pb-4">
              {!isFirstStep && (
                <Button type="button" onClick={back}>
                  Previous
                </Button>
              )}
              <Button type="button" onClick={next} className="ml-auto">
                {isLastStep ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
