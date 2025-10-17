import { createFileRoute } from "@tanstack/react-router";
import ActorPage from "../../pages/ActorPage";

export const Route = createFileRoute("/actor/$roleName")({
  component: ActorPage,
});
