import { createFileRoute, redirect } from "@tanstack/react-router";

// The scanner now lives on the homepage; keep /app working for old links.
export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
