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
import { DemoFormSchema } from "@/routes/demo-form";

export const ServiceCallFormSchema = DemoFormSchema.pick({
  siteEngineer: true,
  siteLocation: true,
  sitePersonName: true,
  sitePersonNumber: true,
});

type ServiceFormInput = z.infer<typeof ServiceCallFormSchema>;

const serviceFormFieldDefinitions: FormFieldDefinitions<ServiceFormInput> = [
  {
    id: "siteEngineer",
    name: "siteEngineer",
    label: "Site Engineer",
    placeholder: "Enter site engineer name",
    description: "Name of the site engineer",
    type: "text",
  },
  {
    id: "siteLocation",
    name: "siteLocation",
    label: "Site Location",
    placeholder: "Enter site location",
    description: "Location of the site",
    type: "text",
  },
  {
    id: "sitePersonName",
    name: "sitePersonName",
    label: "Site Person Name",
    placeholder: "Enter site person name",
    description: "Name of the site contact person",
    type: "text",
  },
  {
    id: "sitePersonNumber",
    name: "sitePersonNumber",
    label: "Site Person Number",
    placeholder: "Enter site person number",
    description: "Phone number of the site contact person",
    type: "text",
  },
];

export default function ServiceCallForm({ control }: StepFormProps) {
  return (
    <FormWrapper
      title="Service Call Form"
      description="Manage your account settings and set e-mail preferences."
    >
      {serviceFormFieldDefinitions.map((formField) => (
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
