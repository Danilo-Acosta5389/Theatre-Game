import { createFileRoute } from "@tanstack/react-router";
import ActorRolePage from "../../../pages/actor/ActorRolePage";

export const Route = createFileRoute("/actor/$sessionId/$roleName")({
  component: ActorRolePage,
});
