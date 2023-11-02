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

const dispatchFormSchema = z.object({
  materialDispatchDate: z.coerce.date(),
  materialRecievedDate: z.coerce.date().max(new Date(), {
    message: "Production Start Date must be in the past",
  }),
  paymentTerms: z.string(),
  tentaiveComissionhDate: z.coerce.date(),
}).refine(data => data.materialDispatchDate > data.materialRecievedDate);

type DispatchFormInput = z.infer<typeof dispatchFormSchema>;

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

export default function DispatchForm() {
  const form = useForm<DispatchFormInput>({
    resolver: zodResolver(dispatchFormSchema),
    defaultValues: {
      materialDispatchDate: new Date(),
      materialRecievedDate: new Date(),
      paymentTerms: "",
      tentaiveComissionhDate: new Date(),
    },
  });

  return (
    <FormWrapper
      title="Dispatch Form"
      description="Manage your account settings and set e-mail preferences."
    >
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit((designFormData) =>
            console.log({ designFormData })
          )}
        >
          {dispatchFormFieldDefinitions.map((formField) => (
            <FormField
              key={formField.id}
              name={formField.name}
              control={form.control}
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
        </form>
      </Form>
    </FormWrapper>
  );
}
