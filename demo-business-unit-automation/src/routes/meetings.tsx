import { getMeetings } from "@/utils/simulate-db";
import { meetingColumns as columns } from "@/data/columns";
import { useEffect, useState } from "react";
import { Meeting } from "@/data/schema";
import Layout from "@/components/layout";

const pageTitle = "Meetings!";
const pageDescription = "Here's a list of your meetings!";

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
    <Layout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      data={data}
      columns={columns}
    />
  );
}
