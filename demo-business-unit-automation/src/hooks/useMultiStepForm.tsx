import { ReactElement, useState } from "react";

type MultiStepFormProps = ReactElement[];

export default function useMultiStepForm(steps: MultiStepFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const step = steps[currentStepIndex];
  const totalSteps = steps.length;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  function next() {
    const nextStepIndex =
      currentStepIndex >= steps.length - 1
        ? currentStepIndex
        : currentStepIndex + 1;
    setCurrentStepIndex(nextStepIndex);
  }

  function back() {
    const prevStepIndex =
      currentStepIndex <= 0 ? currentStepIndex : currentStepIndex - 1;
    setCurrentStepIndex(prevStepIndex);
  }

  function reset() {
    setCurrentStepIndex(0);
  }

  return {
    step,
    totalSteps,
    isFirstStep,
    isLastStep,
    currentStepIndex,
    next,
    back,
    reset,
  };
}
