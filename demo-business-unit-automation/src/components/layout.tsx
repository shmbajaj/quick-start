import DataTable, { DataTableProps } from "./ui/data-table";

export interface LayoutProps<TData, TValue> extends DataTableProps<TData, TValue> {
  pageTitle: string;
  pageDescription: string;
}

export default function Layout<TData, TValue>({
  pageTitle,
  pageDescription,
  data,
  columns,
}: LayoutProps<TData, TValue>) {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{pageTitle}</h2>
            <p className="text-muted-foreground">{pageDescription}</p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
}
