import { getPayments } from "@/utils/simulate-db";
import { paymentColumns as columns } from "@/data/columns";
import { useEffect, useState } from "react";
import { Payment } from "@/data/schema";
import Layout from "@/components/layout";

const pageTitle = "Payments!";
const pageDescription = "Here's a list of your payments!";

export default function Payments() {
  const [data, setPayments] = useState<Array<Payment>>([]);

  useEffect(() => {
    async function getData() {
      const data = await getPayments();
      setPayments(data);
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
