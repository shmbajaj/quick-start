import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldDefinitions } from "@/types";
import { Input } from "../ui/input";
import FormWrapper from "./form-wrapper";
import { Checkbox } from "../ui/checkbox";

const manufacturingFormSchema = z
  .object({
    productionStartDate: z.coerce
      .date()
      .max(new Date(), {
        message: "Production Start Date must be in the past",
      }),
    productionEndDate: z.coerce.date(),
    rawMaterialsUsed: z.string().min(3).max(200),
    qualityControlCheck: z.coerce.boolean(),
    supervisor: z.string().min(3).max(27),
  })
  .refine((data) => data.productionEndDate > data.productionStartDate, {
    message:
      "Production End date must be greater than the Production Start Date',",
    path: ["productionEndDate"],
  });

type ManufacturingFormInput = z.infer<typeof manufacturingFormSchema>;

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

export default function ManufacturingForm() {
  const form = useForm<ManufacturingFormInput>({
    resolver: zodResolver(manufacturingFormSchema),
    defaultValues: {
      productionStartDate: new Date(),
      productionEndDate: new Date(),
      rawMaterialsUsed: "",
      qualityControlCheck: true,
      supervisor: "",
    },
  });

  return (
    <FormWrapper
      title="Manufacturing Form"
      description="Manage your account settings and set e-mail preferences."
    >
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit((designFormData) =>
            console.log({ designFormData })
          )}
        >
          {manufacturingFormFieldDefinitions.map((formField) => (
            <FormField
              key={formField.id}
              name={formField.name}
              control={form.control}
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
        </form>
      </Form>
    </FormWrapper>
  );
}
