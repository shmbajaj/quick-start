import * as z from "zod";
import { DemoFormSchema } from "@/data/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import DesignForm from "@/components/forms/design-form";
import DispatchForm from "@/components/forms/dispatch-form";
import ManufacturingForm from "@/components/forms/manufacturing-form";
import ServiceCallForm from "@/components/forms/service-call-form";

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
