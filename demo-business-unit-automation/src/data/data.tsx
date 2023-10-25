import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import * as z from "zod";

import { meetingFormSchema, paymentFormSchema } from "./form.schema";
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

export const DEFAULT_PAYMENT_FORM_VALUES: z.infer<typeof paymentFormSchema> = {
  clientName: "",
  productName: "",
  poDate: "",
  deliveryDate: "",
  payment: 0,
  recievedPayment: 0,
  location: "",
  currency: "₹",
  status: "",
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

export const paymentFormFields: z.infer<typeof formFieldsSchema> = [
  {
    name: "clientName",
    label: "Client Name",
    placeholder: "Programming the bandwidth...",
    description: "This is client name.",
    type: "text",
  },
  // {
  //   name: "productName",
  //   label: "Product Name",
  //   placeholder: "Programming the bandwidth...",
  //   description: "This is product name.",
  //   type: "text",
  // },
  {
    name: "poDate",
    label: "PO Date",
    placeholder: "Programming the bandwidth...",
    description: "This is your purchase order date.",
    type: "date",
  },
  // {
  //   name: "deliveryDate",
  //   label: "Delivery Date",
  //   placeholder: "Programming the bandwidth...",
  //   description: "This is your delivery date.",
  //   type: "date",
  // },
  {
    name: "payment",
    label: "Total Payment",
    placeholder: "Programming the bandwidth...",
    description: "This is your total payment(amount).",
    type: "number",
  },
  {
    name: "recievedPayment",
    label: "Recived Payment",
    placeholder: "Programming the bandwidth...",
    description: "This is your total recieved payment(amount).",
    type: "number",
  },
  // {
  //   name: "location",
  //   label: "Location",
  //   placeholder: "Programming the bandwidth...",
  //   description: "This is location.",
  //   type: "text",
  // },
];
