import { createFileRoute } from "@tanstack/react-router";
import AudienceRolePage from "../../../pages/audience/AudienceRolePage";

export const Route = createFileRoute("/audience/$sessionId/$roleName")({
  component: AudienceRolePage,
});
