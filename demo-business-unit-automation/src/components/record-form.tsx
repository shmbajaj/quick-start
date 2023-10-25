import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

// TODO: use `HTMLInputTypeAttribute` for form field type
export const formFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  placeholder: z.string(),
  description: z.string(),
  type: z.enum([
    "text",
    "checkbox",
    "date",
    "number",
    "radio",
    "search",
    "time",
    "textarea",
  ]),
});

export const formFieldsSchema = z.array(formFieldSchema);

export interface RecordFormProps {
  values: Record<string, any>;
  isReadOnly?: boolean;
  formSchema: any;
  formFields: z.infer<typeof formFieldsSchema>;
}

function formatDate(date?: string) {
  if (!date) return "";
  const parts = date.split("/");
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  const formattedDate = new Date(`${year}-${month}-${day}`)
    .toISOString()
    .slice(0, 10);
  return formattedDate;
}

export default function RecordForm({
  values,
  isReadOnly,
  formSchema,
  formFields,
}: RecordFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={formField.placeholder}
                    type={formField.type}
                    disabled={isReadOnly}
                    value={
                      formField.type === "date"
                        ? formatDate(field.value)
                        : field.value
                    }
                  />
                </FormControl>
                <FormDescription>{formField.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {!isReadOnly && (
          <div className="flex justify-between space-y-2">
            <Button variant="ghost" type="button">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        )}
      </form>
    </Form>
  );
}
