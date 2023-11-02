import { HTMLInputTypeAttribute } from "react";

export type FormFieldDefinitions<T> = Array<{
  id: keyof T;
  name: keyof T;
  label: string;
  placeholder: string;
  description: string;
  type: HTMLInputTypeAttribute;
}>;
