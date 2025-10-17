import { createFileRoute } from "@tanstack/react-router";
import AudienceRolePage from "../../pages/AudienceRolePage";

export const Route = createFileRoute("/audience/$roleName")({
  component: AudienceRolePage,
});
