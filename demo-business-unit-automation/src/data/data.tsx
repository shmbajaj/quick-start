import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import * as z from "zod";

import { meetingFormSchema } from "./form.schema";
import { formFieldsSchema } from "@/components/record-form";

export const statuses = [
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const currencySymbols = ["₹", "$"] as const;

export const DEFAULT_MEETING_FORM_VALUES: z.infer<typeof meetingFormSchema> = {
  title: "",
  agenda: "",
  date: "",
  location: "",
  startTime: "",
};

export const meetingFormFields: z.infer<typeof formFieldsSchema> = [
  {
    name: "title",
    label: "Title",
    placeholder: "Programming the bandwidth...",
    description: "This is your meeting title.",
    type: "text",
  },
  {
    name: "date",
    label: "Date",
    placeholder: "Programming the bandwidth...",
    description: "This is your meeting date.",
    type: "date",
  },
  {
    name: "startTime",
    label: "Start Time",
    placeholder: "Programming the bandwidth...",
    description: "This is your meeting start time.",
    type: "time",
  },
  {
    name: "location",
    label: "Location",
    placeholder: "Programming the bandwidth...",
    description: "This is your meeting location.",
    type: "text",
  },
];
