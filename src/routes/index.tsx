import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage, HomePage, CreateLeaguePage, JoinLeaguePage, YourLeaguesPage, LeagueDetailPage } from "../pages";
import { useAuthStore } from "@libs/shared/auth/useAuthStore";
import { Header } from "@/components/Header";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Public only routes */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-league"
        element={
          <ProtectedRoute>
            <CreateLeaguePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/join-league"
        element={
          <ProtectedRoute>
            <JoinLeaguePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/your-leagues"
        element={
          <ProtectedRoute>
            <YourLeaguesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/your-leagues/:leagueId"
        element={
          <ProtectedRoute>
            <LeagueDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
