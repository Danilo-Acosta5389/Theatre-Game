import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { BASE } from "../../API/URLS";


export default function DirectorPage() {
  const { sessionId } = useParams({ from: "/director/$sessionId/" });
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

//   useEffect(() => {
//     const conn = new signalR.HubConnectionBuilder()
//       .withUrl(BASE)
//       .withAutomaticReconnect()
//       .build();

//     conn.start().then(() => {
//       console.log("Director is targeting ", sessionId);
//     });

//     setConnection(conn);
//     return () => {
//       conn.stop().catch((err) => {
//         console.error("Error stopping SignalR connection: ", err);
//       });
//     };
//   }, [sessionId]);

alert("Director page is under construction. Functionality to be added soon.");

  const send = async () => {
    if (connection && message.trim()) {
      await connection.invoke("SendInstruction", sessionId, message);
      setMessages((prev) => [...prev, message]);
      setMessage("");
    }
  };

  return (
    <div className=" p-5 flex flex-col gap-3">
      <h2>Director → {sessionId}</h2>
      <form
        className=" flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          className=" bg-black border-white border-2 p-2 rounded-lg text-white w-full max-w-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Send instruction to ${sessionId}`}
          onKeyDown={(e) => {
            e.key === "enter" ? send : "";
          }}
        />
        <button
          className=" border-white border-2 w-fit p-2 rounded-lg hover:bg-slate-500 cursor-pointer"
          type="submit"
        >
          Send
        </button>
      </form>
      {messages.length > 0 && (
        <div>
          <strong>Sent Instructions:</strong>
          <ul className=" p-2">
            {messages.map((msg, index) => (
              <li
                className=" border-white border-2 rounded-lg w-fit bg-slate-800 mt-2 p-2"
                key={index}
              >
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
