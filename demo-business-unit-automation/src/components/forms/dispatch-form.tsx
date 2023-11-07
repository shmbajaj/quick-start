import { DispatchFormSchema } from "@/data/form.schema";
import * as z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormFieldDefinitions, StepFormProps } from "@/types";
import { Input } from "../ui/input";
import FormWrapper from "./form-wrapper";

type DispatchFormInput = z.infer<typeof DispatchFormSchema>;

const dispatchFormFieldDefinitions: FormFieldDefinitions<DispatchFormInput> = [
  {
    id: "materialDispatchDate",
    name: "materialDispatchDate",
    label: "Material Dispatch Date",
    placeholder: "Select a date",
    description: "The date when materials were dispatched",
    type: "date",
  },
  {
    id: "materialRecievedDate",
    name: "materialRecievedDate",
    label: "Material Received Date",
    placeholder: "Select a date",
    description: "The date when materials were received",
    type: "date",
  },
  {
    id: "paymentTerms",
    name: "paymentTerms",
    label: "Payment Terms",
    placeholder: "Enter payment terms",
    description: "Terms of payment for the materials",
    type: "text",
  },
  {
    id: "tentaiveComissionhDate",
    name: "tentaiveComissionhDate",
    label: "Tentative Commission Date",
    placeholder: "Select a date",
    description: "The tentative date for commissioning",
    type: "date",
  },
];

export default function DispatchForm({ control }: StepFormProps) {
  return (
    <FormWrapper
      title="Dispatch Form"
      description="Manage your account settings and set e-mail preferences."
    >
      {dispatchFormFieldDefinitions.map((formField) => (
        <FormField
          key={formField.id}
          name={formField.name}
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formField.label}</FormLabel>
              <FormControl>
                {/* TODO: fix type assertions */}
                <Input
                  {...field}
                  placeholder={formField.placeholder}
                  type={formField.type}
                  value={field.value as string}
                />
              </FormControl>
              <FormDescription>{formField.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </FormWrapper>
  );
}
