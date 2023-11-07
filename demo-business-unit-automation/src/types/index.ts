import { DemoFormInput } from "@/routes/demo-form";
import { HTMLInputTypeAttribute } from "react";
import { Control } from "react-hook-form";

export type FormFieldDefinitions<T> = Array<{
  id: keyof T;
  name: keyof T;
  label: string;
  placeholder: string;
  description: string;
  type: HTMLInputTypeAttribute;
}>;

export type StepFormProps = {
  control: Control<DemoFormInput, any>;
};
