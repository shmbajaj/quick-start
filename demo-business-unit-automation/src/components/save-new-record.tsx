import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import React from "react";

export interface RecordSaveProps {
  children?: React.ReactNode | React.ReactNode[];
  title: string;
  description: string;
  open?: boolean;
  onOpenChange?(open: boolean): void;
  showDialogTrigger?: boolean;
  dialogTriggerTitle?: string;
}

export default function SaveNewRecord({
  children,
  title,
  description,
  open,
  onOpenChange,
  showDialogTrigger,
  dialogTriggerTitle,
}: RecordSaveProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showDialogTrigger && (
        <DialogTrigger asChild>
          <Button>
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            {dialogTriggerTitle}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-[475px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
