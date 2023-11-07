import * as z from "zod";
import { ReactNode, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent } from "./ui/dialog";
import AdvancePaymentForm from "./forms/advance-payment-form";
import AccomplishmentForm from "./forms/accompishment-form";
import { Form } from "./ui/form";
import { DemoTaskListFormSchema } from "@/data/form.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import EngineerAtSiteForm from "./forms/site-report-form";

export type DemoTaskListInput = z.infer<typeof DemoTaskListFormSchema>;

export default function TaskList({
  title,
  icon,
  data,
}: {
  title: "Active" | "Ongoing" | "Done";
  icon: ReactNode;
  data: Array<{ title: string; description: string; status?: string }>;
}) {
  const [open, setIsOpen] = useState(false);
  const form = useForm<DemoTaskListInput>({
    resolver: zodResolver(DemoTaskListFormSchema),
    defaultValues: {
      advanceAmount: 0,
      leftAmount: 0,
      designEngineerNotes: "",
      performanceCertificateNotes: "",
      isAdvanceAmountRecieved: false,
      isLeftAmountRecieved: false,
      isPerformanceCertiticateRecieved: false,
    },
  });

  return (
    <>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardDescription>
          {data.map((item, index) => (
            <div
              className="flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
              key={index}
            >
              {icon}
              <div className="space-y-1">
                <div
                  className="text-sm font-medium leading-none"
                  role="button"
                  onClick={() => setIsOpen(true)}
                >
                  {item.title}
                </div>
                <div className="text-sm text-muted-foreground flex space-x-2">
                  {item.status && (
                    <Badge variant={"outline"}>{item.status}</Badge>
                  )}
                  <span>{item.description}</span>
                </div>
              </div>
            </div>
          ))}
        </CardDescription>
      </Card>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <Form {...form}>
            <form className="space-y-8">
              {title === "Active" && (
                <AdvancePaymentForm control={form.control} />
              )}
              {title === "Done" && (
                <AccomplishmentForm control={form.control} />
              )}
              {title === "Ongoing" && (
                <EngineerAtSiteForm control={form.control} />
              )}
              {title !== "Ongoing" && (
                <div className="flex justify-between p-1 pb-4">
                  <Button type="button" className="ml-auto">
                    Submit
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
