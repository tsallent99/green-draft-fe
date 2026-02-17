import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormTextField } from "@presentation/shared/components";
import { useLoginUser } from "@modules/user/data-access/application/mutations/useLoginUser";
import { useAuthStore } from "@libs/shared/auth/useAuthStore";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
	const authLogin = useAuthStore((s) => s.login);
	const { login, isPending, error } = useLoginUser({
		config: {
			onSuccess: (data) => {
				authLogin(data.accessToken);
			},
		},
	});

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: LoginFormValues) {
		login(values);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900">
						Sign in to your account
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						Or{" "}
						<Link
							to="/register"
							className="font-medium text-primary hover:text-primary/90"
						>
							create a new account
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
							name="password"
							label="Password"
							type="password"
							placeholder="••••••••"
						/>

						{error && (
							<div className="rounded-md bg-destructive/15 p-3">
								<p className="text-sm text-destructive">
									{error.message || "Login failed. Please try again."}
								</p>
							</div>
						)}

						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? "Signing in..." : "Sign in"}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
