import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/sdk")({
  beforeLoad: () => {
    throw redirect({ to: "/docs/getting-started", replace: true });
  },
});
