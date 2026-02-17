import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";
import { Toaster } from "@/components/ui/sonner";
import reportWebVitals from "./reportWebVitals";
import { queryClient } from "./lib/queryClient";
import { ContextProvider } from "@libs/shared/dependency-injection-context";

// Import providers
import { provideUserRepository } from "@modules/user/data-access/dependency-injection/UserRepositoryContext";
import { provideTeamRepository } from "@modules/team/data-access/dependency-injection/TeamRepositoryContext";
import { providePlayerRepository } from "@modules/player/data-access/dependency-injection/PlayerRepositoryContext";
import { provideLeagueRepository } from "@modules/league/data-access/dependency-injection/LeagueRepositoryContext";
import { provideEntryRepository } from "@modules/entry/data-access/dependency-injection/EntryRepositoryContext";
import { provideTournamentRepository } from "@modules/tournament/data-access/dependency-injection/TournamentRepositoryContext";
import { provideLeaderboardRepository } from "@modules/leaderboard/data-access/dependency-injection/LeaderboardRepositoryContext";

// Import adapters
import { ApiUserAdapter } from "@modules/user/data-access/infrastructure/apiUserAdapter";
import { ApiTeamAdapter } from "@modules/team/data-access/infrastructure/apiTeamAdapter";
import { ApiPlayerAdapter } from "@modules/player/data-access/infrastructure/apiPlayerAdapter";
import { ApiLeagueAdapter } from "@modules/league/data-access/infrastructure/apiLeagueAdapter";
import { ApiEntryAdapter } from "@modules/entry/data-access/infrastructure/apiEntryAdapter";
import { ApiTournamentAdapter } from "@modules/tournament/data-access/infrastructure/apiTournamentAdapter";
import { ApiLeaderboardAdapter } from "@modules/leaderboard/data-access/infrastructure/apiLeaderboardAdapter";

// Create adapter instances
const userAdapter = new ApiUserAdapter();
const teamAdapter = new ApiTeamAdapter();
const playerAdapter = new ApiPlayerAdapter();
const leagueAdapter = new ApiLeagueAdapter();
const entryAdapter = new ApiEntryAdapter();
const tournamentAdapter = new ApiTournamentAdapter();
const leaderboardAdapter = new ApiLeaderboardAdapter();

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ContextProvider
          providers={[
            provideUserRepository(userAdapter),
            provideTeamRepository(teamAdapter),
            providePlayerRepository(playerAdapter),
            provideLeagueRepository(leagueAdapter),
            provideEntryRepository(entryAdapter),
            provideTournamentRepository(tournamentAdapter),
            provideLeaderboardRepository(leaderboardAdapter),
          ]}
        >
          <App />
          <Toaster />
        </ContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
