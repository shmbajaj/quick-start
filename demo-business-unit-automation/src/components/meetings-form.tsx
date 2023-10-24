import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

// TODO: use `HTMLInputTypeAttribute` for form field type

const formSchema = z.object({
  title: z.string().min(3).max(50),
  agenda: z.string().max(300),
  // attendes: z.array(attendeSchema),
  // tasks: z.array(taskSchema),
  // isOffline: z.boolean(),
  date: z.string(),
  startTime: z.string(),
  location: z.string().min(3).max(50),
});

const formFieldSchema = z.object({
  name: formSchema.keyof(),
  label: z.string(),
  placeholder: z.string(),
  description: z.string(),
  type: z.enum([
    'text',
    'checkbox',
    'date',
    'number',
    'radio',
    'search',
    'time',
    'textarea',
  ]),
});

const formFieldsSchema = z.array(formFieldSchema);

const formFields: z.infer<typeof formFieldsSchema> = [
  {
    name: 'title',
    label: 'Title',
    placeholder: 'Programming the bandwidth...',
    description: 'This is your meeting title.',
    type: 'text',
  },
  // {
  //   name: 'agenda',
  //   label: 'Agenda',
  //   placeholder: 'Programming the bandwidth...',
  //   description: 'This is your meeting agenda.',
  //   type: 'textarea',
  // },
  {
    name: 'date',
    label: 'Date',
    placeholder: 'Programming the bandwidth...',
    description: 'This is your meeting date.',
    type: 'date',
  },
  {
    name: 'startTime',
    label: 'Start Time',
    placeholder: 'Programming the bandwidth...',
    description: 'This is your meeting start time.',
    type: 'time',
  },
  {
    name: 'location',
    label: 'Location',
    placeholder: 'Programming the bandwidth...',
    description: 'This is your meeting location.',
    type: 'text',
  },
];

type MeetingFormProps = {
  values?: z.infer<typeof formSchema>;
  isReadOnly?: boolean;
};

const DEFAULT_FORM_VALUES: z.infer<typeof formSchema> = {
  title: '',
  agenda: '',
  date: '',
  location: '',
  startTime: '',
  // attendes: [],
  // tasks: [],
  // isOffline: false,
};

function formatDate(date?: string) {
  if (!date) return '';
  const parts = date.split('/');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  const formattedDate = new Date(`${year}-${month}-${day}`)
    .toISOString()
    .slice(0, 10);
  return formattedDate;
}

export default function MeetingForm({ values, isReadOnly }: MeetingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values || DEFAULT_FORM_VALUES,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={formField.placeholder}
                    type={formField.type}
                    disabled={isReadOnly}
                    value={
                      formField.type === 'date'
                        ? formatDate(field.value)
                        : field.value
                    }
                  />
                </FormControl>
                <FormDescription>{formField.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {!isReadOnly && (
          <div className="flex justify-between space-y-2">
            <Button variant="ghost" type="button">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        )}
      </form>
    </Form>
  );
}
