"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

import {
  DEFAULT_MEETING_FORM_VALUES,
  meetingFormFields,
  statuses,
} from "@/data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import SaveNewRecord from "../save-new-record";
import MeetingForm from "../record-form";
import { meetingFormSchema } from "@/data/form.schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter meetings..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="ml-auto mr-4">
        <SaveNewRecord
          title="Add New Meeting"
          description="This will save the details of the new meeting message as a preset,
            which you can access later or share with others."
          dialogTriggerTitle="Add Meeting"
          showDialogTrigger
        >
          <MeetingForm
            values={DEFAULT_MEETING_FORM_VALUES}
            formFields={meetingFormFields}
            formSchema={meetingFormSchema}
          />
        </SaveNewRecord>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
