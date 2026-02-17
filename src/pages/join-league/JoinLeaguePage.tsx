import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useJoinLeague } from "@modules/league/data-access/application/mutations/useJoinLeague";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function JoinLeaguePage() {
	const navigate = useNavigate();
	const [invitationCode, setInvitationCode] = useState("");

	const { joinLeague, isPending, error } = useJoinLeague({
		config: {
			onSuccess: () => {
				toast.success("Joined league successfully!");
				navigate("/your-leagues");
			},
		},
	});

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!invitationCode.trim()) return;
		joinLeague({ invitationCode: invitationCode.trim() });
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900">
						Join a League
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						Enter the invitation code shared by your friend to join their league.
					</p>
				</div>

				<form onSubmit={onSubmit} className="flex gap-2">
					<Input
						placeholder="Invitation code"
						value={invitationCode}
						onChange={(e) => setInvitationCode(e.target.value)}
						disabled={isPending}
					/>
					<Button type="submit" disabled={isPending || !invitationCode.trim()}>
						{isPending ? "Joining..." : "Join"}
					</Button>
				</form>

				{error && (
					<div className="rounded-md bg-destructive/15 p-3">
						<p className="text-sm text-destructive">
							{error.message || "Failed to join league. Please try again."}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
