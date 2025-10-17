import { createFileRoute } from "@tanstack/react-router";
import AudiencePage from "../../pages/AudiencePage";

export const Route = createFileRoute("/audience/")({
  component: AudiencePage,
});

// function RouteComponent() {
//   const roles = ["Mother", "Father", "Mailman", "Child", "Police"];
//   return (
//     <main className="p-4">
//       <div className=" font-bold text-2xl my-4">
//         Select an available role from the list below
//       </div>
//       <ul>
//         {roles.map((role) => (
//           <li
//             key={role}
//             className=" text-xl my-2 cursor-pointer hover:underline hover:text-blue-600"
//           >
//             {role}
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }
