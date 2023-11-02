// type FormFieldDefinitions<T extends keyof Record<string, unknown>> = {
//   [K in T]: {
//     id: K;
//     name: K;
//     label: string;
//     placeholder: string;
//     description: string;
//     value: unknown;
//   };
// };

type FormFieldDefinitions<T> = Array<{
  id: keyof T;
  name: string;
  label: string;
  placeholder: string;
  description: string;
  value: unknown;
}>;
