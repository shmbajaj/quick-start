import { ReactNode } from "react";
import { Separator } from "../ui/separator";

interface FormWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function FormWrapper({
  title,
  description,
  children,
}: FormWrapperProps) {
  return (
    <div className="hidden md:block space-y-6 p-10 pb-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Separator className="my-6" />
      {/* <div className="max-h-[420px] overflow-hidden overflow-y-scroll">
        {children}
      </div> */}
      {children}
    </div>
  );
}
