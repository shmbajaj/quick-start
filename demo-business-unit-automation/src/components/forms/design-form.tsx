import { DesignFormSchema } from "@/data/form.schema";
import * as z from "zod";
import { FormFieldDefinitions, StepFormProps } from "@/types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import FormWrapper from "./form-wrapper";
import { Input } from "../ui/input";

type DesignFormInput = z.infer<typeof DesignFormSchema>;

const designFormFieldDefinitions: FormFieldDefinitions<DesignFormInput> = [
  {
    id: "jobID",
    name: "jobID",
    label: "Job ID",
    placeholder: "Enter job ID here...",
    description: "This is the unique job ID.",
    type: "text",
  },
  {
    id: "model",
    name: "model",
    label: "Model",
    placeholder: "Enter model here...",
    description: "This is the model name.",
    type: "text",
  },
  {
    id: "client",
    name: "client",
    label: "Client Name",
    placeholder: "Enter client name here...",
    description: "This is your client name.",
    type: "text",
  },
  {
    id: "product",
    name: "product",
    label: "Product",
    placeholder: "Enter product name here...",
    description: "This is the product name.",
    type: "text",
  },
  {
    id: "siteAddress",
    name: "siteAddress",
    label: "Site Address",
    placeholder: "Enter site address here...",
    description: "This is the site address.",
    type: "text",
  },
  {
    id: "contactPerson",
    name: "contactPerson",
    label: "Contact Person",
    placeholder: "Enter contact person here...",
    description: "This is your contact person name.",
    type: "text",
  },
  {
    id: "payment",
    name: "payment",
    label: "Payment",
    placeholder: "Enter payment details here...",
    description: "This is the payment information.",
    type: "text",
  },
];

export default function DesignForm({ control }: StepFormProps) {
  return (
    <FormWrapper
      title="Design Form"
      description="Manage your account settings and set e-mail preferences."
    >
      {designFormFieldDefinitions.map((formField) => (
        <FormField
          key={formField.id}
          name={formField.name}
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formField.label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={formField.placeholder}
                  type={formField.type}
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
