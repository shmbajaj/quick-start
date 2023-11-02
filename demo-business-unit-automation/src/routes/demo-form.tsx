import DesignForm from "@/components/forms/design-form";
import DispatchForm from "@/components/forms/dispatch-form";
import ManufacturingForm from "@/components/forms/manufacturing-form";
import ServiceCallForm from "@/components/forms/service-call-form";
import { Button } from "@/components/ui/button";
import useMultiStepForm from "@/hooks/useMultiStepForm";

export default function DemoMultiStepForm() {
  const {
    next,
    back,
    step,
    totalSteps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm([
    <DesignForm />,
    <ManufacturingForm />,
    <DispatchForm />,
    <ServiceCallForm />,
  ]);
  return (
    <div className="relative max-w-4xl m-auto">
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
    </div>
  );
}
