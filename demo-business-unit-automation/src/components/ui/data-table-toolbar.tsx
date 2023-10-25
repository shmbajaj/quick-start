"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

import {
  DEFAULT_MEETING_FORM_VALUES,
  DEFAULT_PAYMENT_FORM_VALUES,
  meetingFormFields,
  paymentFormFields,
  statuses,
} from "@/data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import SaveNewRecord from "../save-new-record";
import RecordForm from "../record-form";
import { meetingFormSchema, paymentFormSchema } from "@/data/form.schema";
import { useLocation } from "react-router-dom";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const location = useLocation();
  const filterKey = location.pathname === "/payments" ? "clientName" : "title";
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter ${
            filterKey === "title" ? "meetings" : "payments"
          }...`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterKey)?.setFilterValue(event.target.value)
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
          title={`Add New ${filterKey === "title" ? "Meeting" : "Payment"}`}
          description={`This will save the details of the new ${
            filterKey === "title" ? "meeting" : "payment"
          } message as a preset,
            which you can access later or share with others.`}
          dialogTriggerTitle={`Add ${
            filterKey === "title" ? "Meeting" : "Payment"
          }`}
          showDialogTrigger
        >
          <RecordForm
            values={
              filterKey === "title"
                ? DEFAULT_MEETING_FORM_VALUES
                : DEFAULT_PAYMENT_FORM_VALUES
            }
            formFields={
              filterKey === "title" ? meetingFormFields : paymentFormFields
            }
            formSchema={
              filterKey === "title" ? meetingFormSchema : paymentFormSchema
            }
          />
        </SaveNewRecord>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
