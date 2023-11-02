import * as z from "zod";
import { Form, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DesignFormSchema = z.object({
  jobID: z.string(),
  model: z.string(),
  client: z.string(),
  product: z.string(),
  siteAddress: z.string(),
  contactPerson: z.string(),
  payment: z.string(),
});

type DesignFormInput = z.infer<typeof DesignFormSchema>;

const designFormFieldDefinitions: FormFieldDefinitions<DesignFormInput> = [
    {
        id: "client", 
        name: "client",
        label: "Client Name",
        placeholder: ""
    }
]

export default function DesignForm() {
  const form = useForm<DesignFormInput>({
    resolver: zodResolver(DesignFormSchema),
    defaultValues: {
      jobID: "",
      model: "",
      client: "",
      product: "",
      siteAddress: "",
      contactPerson: "",
      payment: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit((designFormData) =>
          console.log({ designFormData })
        )}
      ></form>
    </Form>
  );
}
