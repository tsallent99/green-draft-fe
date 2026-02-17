import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  FormSelect,
  FormTextField,
  FormDatePicker,
  FormSwitch,
} from "./index";

// Example Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(18, "Must be at least 18 years old"),
  country: z.string().min(1, "Please select a country"),
  birthDate: z.date({
    error: "A date of birth is required",
  }),
  notifications: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function ExampleForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 0,
      country: "",
      notifications: false,
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "es", label: "Spain" },
    { value: "fr", label: "France" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormTextField
          name="name"
          label="Name"
          placeholder="Enter your name"
          description="This is your public display name."
        />

        <FormTextField
          name="age"
          label="Age"
          type="number"
          placeholder="Enter your age"
          min={0}
          max={120}
        />

        <FormSelect
          name="country"
          label="Country"
          placeholder="Select a country"
          options={countryOptions}
          description="Select your country of residence."
        />

        <FormDatePicker
          name="birthDate"
          label="Date of birth"
          description="Your date of birth is used to calculate your age."
        />

        <FormSwitch
          name="notifications"
          label="Email notifications"
          description="Receive emails about your account activity."
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
