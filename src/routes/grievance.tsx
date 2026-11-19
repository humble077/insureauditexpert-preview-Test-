import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/grievance")({
  component: () => <Navigate to="/grievance-redressal" replace />,
});
