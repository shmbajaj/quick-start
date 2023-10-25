import { currencySymbols, statuses } from "@/data/data";
import { Meeting, Payment, meetingSchema, paymentSchema } from "@/data/schema";
import { faker } from "@faker-js/faker";
import { z } from "zod";

function getAttendes() {
  const limit = faker.number.int({ min: 1, max: 5 });
  return Array.from({ length: limit }, () => {
    const name = faker.person.fullName();
    const email = faker.internet.email({ firstName: name });
    return {
      name,
      email,
    };
  });
}

function getTasks() {
  const limit = faker.number.int({ min: 1, max: 10 });
  return Array.from({ length: limit }, () => ({
    assignedTo: faker.person.fullName(),
    title: faker.lorem.words(),
    description: faker.lorem.sentences(),
  }));
}

// TODO: fix Meeting[] type assertion
async function getMeetings(): Promise<Array<Meeting>> {
  const data = Array.from({ length: 100 }, () => ({
    id: `MEETING-${faker.number.int({ min: 1000, max: 9999 })}`,
    title: faker.hacker
      .phrase()
      .replace(/^./, (letter) => letter.toUpperCase()),
    agenda: faker.lorem.paragraph({ min: 1, max: 3 }),
    status: faker.helpers.arrayElement(statuses).value,
    isOffline: faker.datatype.boolean({ probability: 0 }),
    date: faker.date.soon().toLocaleDateString(),
    startTime: faker.date.soon().toLocaleTimeString(),
    location: faker.location.streetAddress(),
    attendes: getAttendes(),
    tasks: getTasks(),
  }));
  console.log("✅ Meetings data generated.");
  return z.array(meetingSchema).parse(data) as unknown as Array<Meeting>;
}

async function getPayments(): Promise<Array<Payment>> {
  // TODO: fix hard
  const data = Array.from({ length: 100 }, () => ({
    id: `PAYMENT-${faker.number.int({ min: 1000, max: 9999 })}`,
    clientName: faker.internet.domainWord(),
    productName: faker.commerce.productName(),
    poDate: faker.date.soon().toLocaleDateString(),
    deliveryDate: faker.date.soon().toLocaleDateString(),
    payment: faker.finance.amount({
      autoFormat: false,
      dec: 2,
      min: 10000,
      max: 100000,
      symbol: "",
    }),
    recievedPayment: faker.finance.amount({
      autoFormat: false,
      dec: 2,
      min: 5000,
      max: 99000,
      symbol: "",
    }),
    location: faker.location.streetAddress(),
    currency: faker.helpers.arrayElement(currencySymbols),
    status: faker.helpers.arrayElement(statuses).value,
  }));
  console.log("✅ Payments data generated.");
  return z.array(paymentSchema).parse(data) as unknown as Array<Payment>;
}

export { getMeetings, getPayments };
