"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SaveNewRecord from "../save-new-record";
import { useState } from "react";
import RecordForm from "../record-form";
import { meetingFormSchema, paymentFormSchema } from "@/data/form.schema";
import { meetingFormFields, paymentFormFields } from "@/data/data";
import { useLocation } from "react-router-dom";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setIsOpen] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const location = useLocation();
  const filterKey = location.pathname === "/payments" ? "clientName" : "title";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            {/* <span className="sr-only">Open menu</span> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.id)}
          >
            Copy meeting ID
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowViewDialog(true)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* TODO: fix type assertion as `any` */}
      {/* TODO: use data[dot]ts file for hard-coded strings  */}
      <SaveNewRecord
        open={open}
        onOpenChange={setIsOpen}
        title={`Edit ${filterKey === "title" ? "Meeting" : "Payment"}`}
        description={`This will edit the details of the ${
          filterKey === "title" ? "Meeting" : "Payment"
        } message as a preset, which you can access later or share with others.`}
      >
        <RecordForm
          values={row.original as any}
          formFields={
            filterKey === "title" ? meetingFormFields : paymentFormFields
          }
          formSchema={
            filterKey === "title" ? meetingFormSchema : paymentFormSchema
          }
          submitButtonText="Save"
        />
      </SaveNewRecord>
      <SaveNewRecord
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
        title={`View ${filterKey === "title" ? "Meeting" : "Payment"}`}
        description={`This will show the details of the ${
          filterKey === "title" ? "Meeting" : "Payment"
        } message as a preset, which you can access later or share with others.`}
      >
        <RecordForm
          values={row.original as any}
          formFields={
            filterKey === "title" ? meetingFormFields : paymentFormFields
          }
          formSchema={
            filterKey === "title" ? meetingFormSchema : paymentFormSchema
          }
          isReadOnly
        />
      </SaveNewRecord>
    </>
  );
}
