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
    <div className="hidden md:block space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5"></aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
