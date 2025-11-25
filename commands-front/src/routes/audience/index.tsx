import { createFileRoute } from "@tanstack/react-router";
import StarterPage from "../../components/StarterPage";

export const Route = createFileRoute("/audience/")({
  component: () =>{
    return <StarterPage theatreFunction="Audience" />;
  }
});
