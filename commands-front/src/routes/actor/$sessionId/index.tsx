import { createFileRoute } from "@tanstack/react-router";
import ActorCreateRolePage from "../../../pages/actor/ActorCreateRolePage";

export const Route = createFileRoute("/actor/$sessionId/")({
  component: ActorCreateRolePage,
});

/**
 *
 * If you navigate to this page directly without a valid sessionID,
 * make sure to handle the error appropriately (e.g., show an error message or redirect).
 *
 * If you come here from /actor/ page, sessionID should be valid.
 * You can create a role here and navigate to /actor/$sessionID/$roleName page.
 *
 */
