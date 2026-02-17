import { useNavigate } from "react-router-dom";
import { Users, PlusCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const actions = [
  {
    title: "Join a League",
    description:
      "Enter an invitation code to join an existing league and compete against other players.",
    icon: Users,
    route: "/join-league",
    label: "Join League",
  },
  {
    title: "Create a League",
    description:
      "Set up your own league, invite friends, and manage entry fees and prize pools.",
    icon: PlusCircle,
    route: "/create-league",
    label: "Create League",
  },
  {
    title: "Your Leagues",
    description:
      "View all the leagues you've joined, check standings, and manage your teams.",
    icon: Trophy,
    route: "/your-leagues",
    label: "View Leagues",
  },
] as const;

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Welcome to Green Draft</h1>
      <p className="mt-2 text-muted-foreground">
        What would you like to do?
      </p>

      <div className="mt-8 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
        {actions.map((action) => (
          <Card key={action.route} className="flex flex-col">
            <CardHeader>
              <action.icon className="mb-2 h-8 w-8 text-primary" />
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button
                className="w-full"
                onClick={() => navigate(action.route)}
              >
                {action.label}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
