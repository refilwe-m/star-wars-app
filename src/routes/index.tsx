import { createFileRoute } from "@tanstack/react-router";

import { App } from "@/components";

export const Route = createFileRoute("/")({
	component: App,
});
