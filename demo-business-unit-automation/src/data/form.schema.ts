import * as z from "zod";
import { currencySymbols } from "./data";

export const meetingFormSchema = z.object({
  title: z.string().min(3).max(50),
  agenda: z.string().max(300),
  date: z.string(),
  startTime: z.string(),
  location: z.string().min(3).max(50),
});

export const paymentFormSchema = z.object({
  clientName: z.string().min(3).max(50),
  productName: z.string().min(3).max(50),
  poDate: z.string(),
  deliveryDate: z.string(),
  payment: z.number(),
  recievedPayment: z.number(),
  location: z.string(),
  currency: z.enum(currencySymbols),
  status: z.string(),
});
