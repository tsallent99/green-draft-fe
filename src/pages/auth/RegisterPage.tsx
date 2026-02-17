import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormTextField } from "@presentation/shared/components";
import { useRegisterUser } from "@modules/user/data-access/application/mutations/useRegisterUser";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, isPending, error } = useRegisterUser({
    config: {
      onSuccess: () => {
        // Navigate to login page after successful registration
        navigate("/login");
      },
    },
  });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      fullName: "",
    },
  });

  function onSubmit(values: RegisterFormValues) {
    registerUser(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign in
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormTextField
              name="email"
              label="Email address"
              type="text"
              placeholder="name@example.com"
            />

            <FormTextField
              name="username"
              label="Username"
              type="text"
              placeholder="johndoe"
            />

            <FormTextField
              name="fullName"
              label="Full name (optional)"
              type="text"
              placeholder="John Doe"
            />

            <FormTextField
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />

            {error && (
              <div className="rounded-md bg-destructive/15 p-3">
                <p className="text-sm text-destructive">
                  {error.message || "Registration failed. Please try again."}
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
