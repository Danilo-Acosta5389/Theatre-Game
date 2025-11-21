import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";

function ActorCreateRolePage() {
  const { sessionId } = useParams({ from: "/actor/$sessionId/" });
  const [roleName, setRoleName] = useState("");
  const navigate = useNavigate();
  //const [connected, setConnected] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!sessionId) return;
  //   const conn = new HubConnectionBuilder()
  //     .withUrl(BASE)
  //     .withAutomaticReconnect()
  //     .build();
  //   if (connected) {
  //     conn
  //       .start()
  //       .then(async () => {
  //         await conn.invoke("CreateSessionAndRole", sessionId, roleName);
  //       })
  //       .catch(console.error);
  //   }
  //   return () => {
  //     conn.stop().catch(() => {});
  //   };
  // }, [connected]);

  function submit() {
    if (!sessionId || !roleName) return;
    navigate({
      to: "/actor/$sessionId/$roleName",
      params: { sessionId, roleName },
    });
  }

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
export default ActorCreateRolePage;
