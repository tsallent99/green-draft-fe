import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormTextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "number" | "password" | "email";
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export function FormTextField({
  name,
  label,
  placeholder,
  description,
  type = "text",
  disabled,
  min,
  max,
  step,
}: FormTextFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              {...field}
              onChange={(e) => {
                // Convert to number if type is number
                if (type === "number") {
                  const value = e.target.value === "" ? "" : Number(e.target.value);
                  field.onChange(value);
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
