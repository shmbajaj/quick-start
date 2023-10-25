import { z } from "zod";
import { currencySymbols } from "./data";

export const attendeSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export const taskSchema = z.object({
  assignedTo: z.string(),
  title: z.string(),
  description: z.string(),
});

// TODO:
// change startTime
// change location
// check date alteranative
// check isOffline alternative
export const meetingSchema = z.object({
  id: z.string(),
  title: z.string(),
  agenda: z.string(),
  status: z.string(),
  attendes: z.array(attendeSchema),
  tasks: z.array(taskSchema),
  isOffline: z.boolean(),
  date: z.string(),
  startTime: z.string(),
  location: z.string(),
});

export const paymentSchema = z.object({
  id: z.string(),
  clientName: z.string(),
  productName: z.string(),
  poDate: z.string(),
  deliveryDate: z.string(),
  payment: z.string(),
  recievedPayment: z.string(),
  location: z.string(),
  currency: z.enum(currencySymbols),
  status: z.string(),
});

export type Meeting = z.infer<typeof meetingSchema>;
export type Task = z.infer<typeof taskSchema>;
export type Attende = z.infer<typeof attendeSchema>;
export type Payment = z.infer<typeof paymentSchema>;
