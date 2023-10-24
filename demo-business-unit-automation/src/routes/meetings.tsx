import { getMeetings } from '@/utils/simulate-db';
import DataTable from '@/components/ui/data-table';
import { meetingColumns as columns } from '@/data/columns';
import { useEffect, useState } from 'react';
import { Meeting } from '@/data/schema';

export default function Meetings() {
  const [data, setMeetings] = useState<Array<Meeting>>([]);

  useEffect(() => {
    async function getData() {
      const data = await getMeetings();
      setMeetings(data);
    }
    getData();
  }, []);

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Meetings!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your meetings!
            </p>
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
