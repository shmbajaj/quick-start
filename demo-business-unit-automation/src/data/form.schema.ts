import * as z from "zod";
import { currencySymbols } from "./data";

export const AdvancePaymentFormSchema = z.object({
  advanceAmount: z.coerce.number().min(1),
  isAdvanceAmountRecieved: z.coerce.boolean(),
});

export const AccomplishmentFormSchema = z.object({
  leftAmount: z.coerce.number().min(1),
  isLeftAmountRecieved: z.coerce.boolean(),
  isPerformanceCertiticateRecieved: z.coerce.boolean(),
  performanceCertificateNotes: z.string(),
  designEngineerNotes: z.string(),
});

export const EngineerAtSiteFormSchema = z.object({
  hasInternet: z.coerce.boolean(),
  cannotWork: z.coerce.boolean(),
  cannotWorkNotes: z.coerce.boolean(),
  location: z.string(),
});

export const DemoTaskListFormSchema = AdvancePaymentFormSchema.merge(
  AccomplishmentFormSchema
).merge(EngineerAtSiteFormSchema);

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

export const DesignFormSchema = z.object({
  jobID: z
    .string()
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The jobID must contain only letters, numbers and underscore (_)"
    ),
  model: z.string().min(3).max(50),
  client: z.string().min(3).max(25),
  product: z.string().min(3).max(50),
  siteAddress: z.string().min(10).max(100),
  contactPerson: z.string().min(3).max(23),
  payment: z.coerce.number().min(0).max(100),
});

export const ManufacturingFormSchema = z.object({
  productionStartDate: z.coerce.date().max(new Date(), {
    message: "Production Start Date must be in the past",
  }),
  productionEndDate: z.coerce.date(),
  rawMaterialsUsed: z.string().min(3).max(200),
  qualityControlCheck: z.coerce.boolean(),
  supervisor: z.string().min(3).max(27),
});

export const DispatchFormSchema = z.object({
  materialDispatchDate: z.coerce.date(),
  materialRecievedDate: z.coerce.date().max(new Date(), {
    message: "Material Recieve Date must be in the past",
  }),
  paymentTerms: z.string(),
  tentaiveComissionhDate: z.coerce.date(),
});

export const ServiceCallFormSchema = z.object({
  siteEngineer: z
    .string()
    .min(4, {
      message: "The site engineer name must be 4 characters or more",
    })
    .max(27, {
      message: "The site engineer name must be 27 characters or less",
    })
    .regex(/^[a-zA-Z]+$/, "The site engineer name must contain only letters"),
  siteLocation: z
    .string()
    .min(4, { message: "The site location must be 4 characters or more" })
    .max(120, {
      message: "The site location must be 120 characters or less",
    }),
  sitePersonName: z
    .string()
    .min(4, { message: "The site person name must be 4 characters or more" })
    .max(27, {
      message: "The site person name must be 27 characters or less",
    })
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

export const DemoFormSchema = DesignFormSchema.merge(ManufacturingFormSchema)
  .merge(DispatchFormSchema)
  .merge(ServiceCallFormSchema)
  .refine((data) => data.materialDispatchDate > data.materialRecievedDate, {
    message:
      "Material Dispatch date must be greater than the Material Recieve Date",
    path: ["materialDispatchDate"],
  })
  .refine((data) => data.productionEndDate > data.productionStartDate, {
    message:
      "Production End date must be greater than the Production Start Date",
    path: ["productionEndDate"],
  });
