import * as z from "zod";
import FormWrapper from "./form-wrapper";
import { accomplishmentFormSchema } from "@/data/form.schema";
import { FormFieldDefinitions } from "@/types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

type AccomplishmentFormInput = z.infer<typeof accomplishmentFormSchema>;

const accomplishmentFormFieldDefinitions: FormFieldDefinitions<AccomplishmentFormInput> =
  [
    {
      id: "isLeftAmountRecieved",
      name: "isLeftAmountRecieved",
      label: "Is Left Amount",
      placeholder: "Select if Left amount recieved...",
      description: "Select only if Left is recieved",
      type: "checkbox",
    },
    {
      id: "leftAmount",
      name: "leftAmount",
      label: "Left Amount",
      placeholder: "Enter Left amount here...",
      description: "This is the Left amount.",
      type: "number",
    },
    {
      id: "designEngineerNotes",
      name: "designEngineerNotes",
      label: "Design Engineer Notes",
      placeholder: "Enter notes here...",
      description: "This is the notes by design engineer.",
      type: "text",
    },
    {
      id: "isPerformanceCertiticateRecieved",
      name: "isPerformanceCertiticateRecieved",
      label: "Is Performance Certificate",
      placeholder: "Select if performance certificate recieved...",
      description: "Select only if pefromance certificate is recieved",
      type: "checkbox",
    },
    {
      id: "performanceCertificateNotes",
      name: "performanceCertificateNotes",
      label: "Performance Certificate Notes",
      placeholder: "Enter performance certificate here...",
      description: "This is the performance certificate.",
      type: "text",
    },
  ];

export default function AccomplishmentForm() {
  return (
    <FormWrapper
      title="Advance Payment Form"
      description="Manage your account settings and set e-mail preferences."
    >
      {accomplishmentFormFieldDefinitions.map((formField) => (
        <FormField
          key={formField.id}
          name={formField.name}
          //   control={control}
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
