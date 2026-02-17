import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormTextField, FormSelect } from "@presentation/shared/components";
import { useCreateLeagueForm } from "./useCreateLeagueForm";

export function CreateLeaguePage() {
  const {
    form,
    tournamentOptions,
    isTournamentsLoading,
    onSubmit,
    isPending,
    error,
  } = useCreateLeagueForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Create a League
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Set up a new league and invite your friends
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormTextField
              name="name"
              label="League Name"
              placeholder="My Awesome League"
            />

            <FormSelect
              name="tournamentId"
              label="Tournament"
              placeholder="Select a tournament"
              options={tournamentOptions}
              disabled={isTournamentsLoading}
            />

            <FormTextField
              name="entryFee"
              label="Entry Fee"
              type="number"
              placeholder="0"
              min={0}
              step={0.01}
            />

            <FormTextField
              name="maxParticipants"
              label="Max Participants (optional)"
              type="number"
              placeholder="No limit"
              min={2}
            />

            {error && (
              <div className="rounded-md bg-destructive/15 p-3">
                <p className="text-sm text-destructive">
                  {error.message || "Failed to create league. Please try again."}
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create League"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
