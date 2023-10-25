import { meetingColumns as columns } from "@/data/columns";
import { Meeting } from "@/data/schema";
import Layout from "@/components/layout";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const pageTitle = "Meetings!";
const pageDescription = "Here's a list of your meetings!";

export default function Meetings() {
  const navigation = useNavigation();
  const data = useLoaderData();

  if (navigation.state === "loading") {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  return (
    <Layout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      data={data as Array<Meeting>}
      columns={columns}
    />
  );
}
