import * as z from "zod";
import { ManufacturingFormSchema } from "@/data/form.schema";
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
import { Checkbox } from "../ui/checkbox";

type ManufacturingFormInput = z.infer<typeof ManufacturingFormSchema>;

const manufacturingFormFieldDefinitions: FormFieldDefinitions<ManufacturingFormInput> =
  [
    {
      id: "productionStartDate",
      name: "productionStartDate",
      label: "Production Start Date",
      placeholder: "Enter production start date",
      description: "The date when production starts",
      type: "date",
    },
    {
      id: "productionEndDate",
      name: "productionEndDate",
      label: "Production End Date",
      placeholder: "Enter production end date",
      description: "The date when production ends",
      type: "date",
    },
    {
      id: "rawMaterialsUsed",
      name: "rawMaterialsUsed",
      label: "Raw Materials Used",
      placeholder: "Enter raw materials used",
      description: "The materials used in production",
      type: "text",
    },
    {
      id: "qualityControlCheck",
      name: "qualityControlCheck",
      label: "Quality Control Check",
      placeholder: "Check quality control",
      description: "Indicate if quality control is checked",
      type: "checkbox",
    },
    {
      id: "supervisor",
      name: "supervisor",
      label: "Supervisor",
      placeholder: "Enter supervisor's name",
      description: "Name of the supervisor",
      type: "text",
    },
  ];

export default function ManufacturingForm({ control }: StepFormProps) {
  return (
    <FormWrapper
      title="Manufacturing Form"
      description="Manage your account settings and set e-mail preferences."
    >
      {manufacturingFormFieldDefinitions.map((formField) => (
        <FormField
          key={formField.id}
          name={formField.name}
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* TODO: fix type assertions */}
                {formField.type === "checkbox" ? (
                  <>
                    <Checkbox
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                    />
                    <div className="space-y-1">
                      <FormLabel>{formField.label}</FormLabel>
                    </div>
                  </>
                ) : (
                  <>
                    <FormLabel>{formField.label}</FormLabel>
                    <Input
                      {...field}
                      placeholder={formField.placeholder}
                      type={formField.type}
                      value={field.value as string}
                    />
                  </>
                )}
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
