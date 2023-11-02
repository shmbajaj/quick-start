import DesignForm from "@/components/forms/design-form";
import DispatchForm from "@/components/forms/dispatch-form";
import ManufacturingForm from "@/components/forms/manufacturing-form";
import ServiceCallForm from "@/components/forms/service-call-form";
import { Button } from "@/components/ui/button";
import useMultiStepForm from "@/hooks/useMultiStepForm";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   SendHorizontalIcon,
// } from "lucide-react";

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
    <div className="relative">
      <div className="absolute top-2 right-2">
        {currentStepIndex + 1} / {totalSteps}
      </div>
      {step}
      <div>
        {!isFirstStep && (
          <Button type="button" onClick={back}>
            Previous
            {/* <ChevronLeftIcon className="mr-2 h-4 w-4" />  */}
          </Button>
        )}
        <Button type="button" onClick={next}>
          {isLastStep ? "Submit" : "Next"}
          {/* {isLastStep ? (
            <SendHorizontalIcon className="mr-2 h-4 w-4" />
          ) : (
            <ChevronRightIcon className="mr-2 h-4 w-4" />
          )} */}
        </Button>
      </div>
    </div>
  );
}
