import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@libs/shared/auth/useAuthStore";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);

  const isNotHome = location.pathname !== "/";

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="w-10">
        {isNotHome && (
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <button className="cursor-pointer">
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48 p-1">
          <button
            onClick={() => navigate("/settings")}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </PopoverContent>
      </Popover>
    </header>
  );
}
