import * as z from "zod";
import FormWrapper from "./form-wrapper";
import { EngineerAtSiteFormSchema } from "@/data/form.schema";
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
import { Control } from "react-hook-form";
import { DemoTaskListInput } from "../task-list";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

type EngineerAtSiteFormInput = z.infer<typeof EngineerAtSiteFormSchema>;

const engineerAtSiteFormFieldDefinitions: FormFieldDefinitions<EngineerAtSiteFormInput> =
  [
    // {
    //   id: "hasInternet",
    //   name: "hasInternet",
    //   label: "Has Internet",
    //   placeholder: "Select if Internet is available...",
    //   description: "Select if Internet is available at the site location.",
    //   type: "checkbox",
    // },
    {
      id: "location",
      name: "location",
      label: "Location",
      placeholder: "Enter location...",
      description: "Enter the location of the site.",
      type: "text",
    },
    {
      id: "cannotWork",
      name: "cannotWork",
      label: "Cannot Work",
      placeholder: "Select if the engineer cannot work...",
      description: "Select if the engineer cannot work at the site.",
      type: "checkbox",
    },
    {
      id: "cannotWorkNotes",
      name: "cannotWorkNotes",
      label: "Cannot Work Notes",
      placeholder: "Enter notes here...",
      description: "Enter notes when the engineer cannot work.",
      type: "text",
    },
  ];

const engineerAtSiteFormData = [
  {
    hasInternet: true,
    cannotWork: false,
    cannotWorkNotes: "No power at site",
    location: "123 Main Street",
  },
  {
    hasInternet: false,
    cannotWork: true,
    cannotWorkNotes: "No power at site",
    location: "456 Elm Road",
  },
  {
    hasInternet: true,
    cannotWork: true,
    cannotWorkNotes: "Heavy rain",
    location: "789 Oak Avenue",
  },
  {
    hasInternet: false,
    cannotWork: false,
    cannotWorkNotes: "No power at site",
    location: "555 Pine Lane",
  },
  {
    hasInternet: true,
    cannotWork: true,
    cannotWorkNotes: "Equipment malfunction",
    location: "321 Cedar Street",
  },
  //   {
  //     hasInternet: true,
  //     cannotWork: false,
  //     cannotWorkNotes: "No power at site",
  //     location: "777 Birch Boulevard",
  //   },
];

function EASForm({ control }: { control: Control<DemoTaskListInput, any> }) {
  return (
    <FormWrapper
      title="Location Tracking Form"
      description="Manage your account settings and set e-mail preferences."
    >
      {engineerAtSiteFormFieldDefinitions.map((formField) => (
        <FormField
          key={formField.id}
          name={formField.name}
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* TODO: fix type assertions */}
                {formField.type === "checkbox" ? (
                  <div className="flex gap-1 items-center">
                    <Checkbox
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                    />
                    <div className="space-y-1">
                      <FormLabel>{formField.label}</FormLabel>
                    </div>
                  </div>
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
              {formField.type !== "checkbox" && (
                <FormDescription>{formField.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <div className="flex justify-between p-1 pb-4">
        <Button type="button" className="ml-auto">
          Save
        </Button>
      </div>
    </FormWrapper>
  );
}

export default function EngineerAtSiteForm({
  control,
}: {
  control: Control<DemoTaskListInput, any>;
}) {
  return (
    <FormWrapper
      title="Engineer At Site Form"
      description="Manage your account settings and set e-mail preferences."
    >
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex mt-4">
            <Button className="ml-auto" type="button">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </div>
        </DialogTrigger>
        <ScrollArea className="h-72 rounded-md border">
          <div className="p-4">
            {/* <h4 className="mb-4 text-sm font-medium leading-none">
              Location Tracked
            </h4> */}
            {engineerAtSiteFormData.map((each, index) => (
              <>
                <div key={index}>
                  <p>
                    <span className="text-[15px] font-medium">Location:</span>{" "}
                    <span className="text-[15px]"> {each.location}</span>
                  </p>
                  {each.cannotWork && (
                    <p className="text-sm">
                      <span className="text-[15px] font-medium">
                        Cannot Work:
                      </span>{" "}
                      <span className="text-[15px]">
                        {" "}
                        {each.cannotWorkNotes}
                      </span>
                    </p>
                  )}
                </div>
                {index !== engineerAtSiteFormData.length - 1 && (
                  <Separator className="my-2" />
                )}
              </>
            ))}
          </div>
        </ScrollArea>
        <DialogContent>
          <EASForm control={control} />
        </DialogContent>
      </Dialog>
    </FormWrapper>
  );
}
