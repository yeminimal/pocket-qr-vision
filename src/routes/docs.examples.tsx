import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/examples")({
  beforeLoad: () => {
    throw redirect({ to: "/docs/getting-started", replace: true });
  },
});
