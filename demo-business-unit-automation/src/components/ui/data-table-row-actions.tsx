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
import MeetingForm from "../record-form";
import { meetingFormSchema } from "@/data/form.schema";
import { meetingFormFields } from "@/data/data";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setIsOpen] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
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
        title="Edit Meeting"
        description="This will edit the details of the meeting message as a preset, which you can access later or share with others."
      >
        <MeetingForm
          values={row.original as any}
          formFields={meetingFormFields}
          formSchema={meetingFormSchema}
        />
      </SaveNewRecord>
      <SaveNewRecord
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
        title="View Meeting"
        description="This will show the details of the meeting message as a preset, which you can access later or share with others."
      >
        <MeetingForm
          values={row.original as any}
          formFields={meetingFormFields}
          formSchema={meetingFormSchema}
          isReadOnly
        />
      </SaveNewRecord>
    </>
  );
}
