import { createFileRoute } from "@tanstack/react-router";
import ActorStartPage from "../../pages/actor/ActorStartPage";

export const Route = createFileRoute("/actor/")({
  component: ActorStartPage,
});
