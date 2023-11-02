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

const ServiceCallFormSchema = z.object({
  siteEngineer: z
    .string()
    .min(4, { message: "The site engineer name must be 4 characters or more" })
    .max(27, {
      message: "The site engineer name must be 27 characters or less",
    })
    .regex(/^[a-zA-Z]+$/, "The site engineer name must contain only letters"),
  siteLocation: z
    .string()
    .min(4, { message: "The site location must be 4 characters or more" })
    .max(120, { message: "The site location must be 120 characters or less" }),
  sitePersonName: z
    .string()
    .min(4, { message: "The site person name must be 4 characters or more" })
    .max(27, { message: "The site person name must be 27 characters or less" })
    .regex(/^[a-zA-Z]+$/, "The site person name must contain only letters"),
  sitePersonNumber: z
    .string()
    .min(10, {
      message: "The site person number must be 10 characters",
    })
    .max(10, {
      message: "The site person number must be 10 characters",
    })
    .regex(/^[6-9]\d{9}$/, "The site person number must contain numbers"),
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

export default function ServiceCallForm() {
  const form = useForm<ServiceFormInput>({
    resolver: zodResolver(ServiceCallFormSchema),
    defaultValues: {
      siteEngineer: "",
      siteLocation: "",
      sitePersonName: "",
      sitePersonNumber: "",
    },
  });

  return (
    <FormWrapper
      title="Service Call Form"
      description="Manage your account settings and set e-mail preferences."
    >
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit((designFormData) =>
            console.log({ designFormData })
          )}
        >
          {serviceFormFieldDefinitions.map((formField) => (
            <FormField
              key={formField.id}
              name={formField.name}
              control={form.control}
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
        </form>
      </Form>
    </FormWrapper>
  );
}
