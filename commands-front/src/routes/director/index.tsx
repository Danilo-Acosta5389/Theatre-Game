import { createFileRoute } from "@tanstack/react-router";
import StarterPage from "../../components/StarterPage";

export const Route = createFileRoute("/director/")({
  component: () =>{
    return <StarterPage theatreFunction="Director" />;
  }
});
