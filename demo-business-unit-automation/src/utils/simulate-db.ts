import { statuses } from '@/data/data';
import { Meeting, meetingSchema } from '@/data/schema';
import { faker } from '@faker-js/faker';
import { z } from 'zod';

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
  console.log('✅ Meetings data generated.');
  return z.array(meetingSchema).parse(data) as unknown as Array<Meeting>;
}

export { getMeetings };
