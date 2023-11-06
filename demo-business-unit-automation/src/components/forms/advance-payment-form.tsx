import * as z from "zod";
import FormWrapper from "./form-wrapper";
import { advancePaymentFormSchema } from "@/data/form.schema";
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

type AdvancePaymentFormInput = z.infer<typeof advancePaymentFormSchema>;

const advancePaymentFormFieldDefinitions: FormFieldDefinitions<AdvancePaymentFormInput> =
  [
    {
      id: "advanceAmount",
      name: "advanceAmount",
      label: "Advance Amount",
      placeholder: "Enter Advance amount here...",
      description: "This is the Advance amount.",
      type: "number",
    },
    {
      id: "isAdvanceAmountRecieved",
      name: "isAdvanceAmountRecieved",
      label: "Is Advance Amount",
      placeholder: "Select if Advance amount recieved...",
      description: "Select only if advance is recieved",
      type: "checkbox",
    },
  ];

export default function AdvancePaymentForm() {
  return (
    <FormWrapper
      title="Advance Payment Form"
      description="Manage your account settings and set e-mail preferences."
    >
      {advancePaymentFormFieldDefinitions.map((formField) => (
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
