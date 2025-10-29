import { createFileRoute } from "@tanstack/react-router";
import AudienceRoleListPage from "../../../pages/audience/AudienceRoleListPage";

export const Route = createFileRoute("/audience/$sessionId/")({
  component: AudienceRoleListPage,
});

/**
 * Don't forget error handling for missing or invalid sessionID
 *
 *
 */
