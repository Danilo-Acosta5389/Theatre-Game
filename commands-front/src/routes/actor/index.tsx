import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/actor/")({
  component: RouteComponent,
});
function RouteComponent() {
  const [roleName, setRoleName] = useState("");
  const navigate = useNavigate();

  function submit() {
    navigate({ to: "/actor/$roleName", params: { roleName } });
  }

  useEffect(() => {}, [roleName]);
  return (
    <main className="p-4">
      <div className=" font-bold text-2xl my-4">
        Hello actor <br />
        Create a role
      </div>
      <form action={submit}>
        <input
          type="text"
          className=" border-2 rounded"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Type your role name"
        />
        <button
          className="bg-blue-800 text-white px-2 py-1 rounded-md ml-2 cursor-pointer hover:bg-blue-600"
          type="submit"
        >
          create
        </button>
      </form>
    </main>
  );
}
