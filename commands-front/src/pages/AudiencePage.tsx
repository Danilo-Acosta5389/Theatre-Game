import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as signalR from "@microsoft/signalr";

function AudiencePage() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5299/theatrehub`)
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      await conn.start();
      console.log("Connected as audience");

      // 1️⃣ Fetch existing roles on first load
      const activeRoles = await conn.invoke("GetActiveRoles");
      setRoles(activeRoles);

      // 2️⃣ Listen for role updates in real time
      conn.on("UpdateRoles", (activeRoles) => {
        setRoles(activeRoles);
      });
    };

    startConnection();
    //setConnection(conn);

    return () => {
      conn.stop();
    };
  }, []);

  return (
    <div className=" p-5">
      <strong>Available roles</strong>
      {roles.length === 0 && <p>No active roles</p>}
      <ul>
        {roles.map((role) => (
          <li
            key={role}
            className=" hover:bg-slate-800 px-2 py-1 my-1 rounded-md cursor-pointer w-fit"
          >
            <Link to={`/audience/${role}`}>{role}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AudiencePage;
