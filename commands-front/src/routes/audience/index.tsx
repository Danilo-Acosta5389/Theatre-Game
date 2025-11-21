import { createFileRoute } from "@tanstack/react-router";
import AudienceStartPage from "../../pages/audience/AudienceStartPage";

export const Route = createFileRoute("/audience/")({
  component: AudienceStartPage,
});
