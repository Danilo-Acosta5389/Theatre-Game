import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { makeRandomSessionId, isValidSessionId } from "../utils/session";
import { Loader } from "lucide-react";
import { CHECK_SESSION_URL, CREATE_SESSION_URL } from "../API/URLS";
import {motion} from "motion/react";

function StartPage({theatreFunction}:{theatreFunction:string}) {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(() => makeRandomSessionId());
  const [option, setOption] = useState<"create" | "enter" | "">("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // dont forget to set isLoading properly

  useEffect(() => {
    if (option === "create" || option === "enter") {
      // Show animation on mount
      setTimeout(() => setIsModalVisible(true), 10);
    } else {
      setIsModalVisible(false);
    }
    console.log("Option changed to: ", option);
  }, [option]);

  function closeModal() {
    // Trigger fade-out
    setIsModalVisible(false);
    setTimeout(() => setOption(""), 200); // Match transition duration
    setTimeout(() => setSessionId(makeRandomSessionId()), 200);
  }

  async function goToSession(): Promise<void> {
    if (!isValidSessionId(sessionId)) {
      alert("Session ID must be 6–20 characters");

      return;
    }

    if (!sessionId) return;
    setIsLoading(true);

    // if (option === "create") {
    //   const res = await fetch(CREATE_SESSION_URL(sessionId), {
    //     method: "POST",
    //   });

    //   if (!res.ok) {
    //     alert("Session already exists!");
    //     setIsLoading(false);
    //     return;
    //   }
    // }

    // if (option === "enter") {
    //   const res = await fetch(CHECK_SESSION_URL(sessionId), {
    //     method: "POST",
    //   });

    //   if (!res.ok) {
    //     alert("Session does not exist!");
    //     setIsLoading(false);
    //     return;
    //   }
    // }

    navigate({
      to: "/"+theatreFunction+"/$sessionId/",
      params: { sessionId },
    });
  }

  return (
    <motion.main
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{ duration: 1 }}
    className="p-4 flex flex-col items-center justify-center h-[80vh]">
      <h1 className=" text-2xl">For {theatreFunction}</h1>
      <h1
        className="font-bold text-3xl my-4 hover:bg-slate-200 hover:text-black border-2 px-3 pt-2 pb-3 rounded cursor-pointer text-center"
        onClick={() => setOption("create")}
      >
        Create a new session
      </h1>

      {option === "create" && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50
      transition-opacity duration-200
      ${isModalVisible ? "opacity-100" : "opacity-0"}
      bg-black/60`}
        >
          <form
            action={goToSession}
            className={`bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col gap-4 min-w-[300px] border border-white
        transition-all duration-200 
        ${isModalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
      `}
          >
            <div className="flex flex-col">
              <input
                disabled={isLoading}
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                maxLength={20}
                className={
                  isLoading
                    ? "opacity-50 border-2 p-2 bg-black text-white border-white rounded font-bold text-center cursor-not-allowed"
                    : "border-2 p-2 bg-black text-white border-white rounded font-bold text-center"
                }
              />
              <span className="mt-2 text-sm">
                Edit code or use generated one
              </span>
            </div>
            <button
              disabled={isLoading}
              className={
                isLoading
                  ? "bg-blue-800 text-white px-3 py-2 rounded cursor-not-allowed opacity-50"
                  : "bg-blue-800 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              }
              type="submit"
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5 mx-auto" />
              ) : (
                "Create session"
              )}
            </button>
            <button
              disabled={isLoading}
              type="button"
              onClick={closeModal}
              className={
                isLoading
                  ? "text-gray-300 text-sm underline cursor-not-allowed opacity-50"
                  : "text-gray-300 text-sm underline hover:text-white cursor-pointer"
              }
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <p className="my-4 pb-2 text-gray-400 text-2xl max-w-md">or</p>

      <h1
        className="font-bold text-3xl my-4 hover:bg-slate-200 hover:text-black border-2 px-3 pt-2 pb-3 rounded cursor-pointer text-center"
        onClick={() => setOption("enter")}
      >
        Enter an existing one!
      </h1>

      {option === "enter" && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50
      transition-opacity duration-200
      ${isModalVisible ? "opacity-100" : "opacity-0"}
      bg-black/60`}
        >
          <form
            action={goToSession}
            className={`bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col gap-4 min-w-[300px] border border-white
        transition-all duration-200 
        ${isModalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
      `}
          >
            <div className="flex flex-col">
              <input
                disabled={isLoading}
                placeholder="Enter your session id here"
                onChange={(e) => setSessionId(e.target.value)}
                maxLength={20}
                className={
                  isLoading
                    ? "opacity-50 border-2 p-2 bg-black text-white border-white rounded font-bold text-center cursor-not-allowed"
                    : "border-2 p-2 bg-black text-white border-white rounded font-bold text-center"
                }
              />
            </div>
            <button
              disabled={isLoading}
              className={
                isLoading
                  ? "bg-blue-800 text-white px-3 py-2 rounded cursor-not-allowed opacity-50"
                  : "bg-blue-800 text-white px-3 py-2 rounded hover:bg-blue-600 cursor-pointer"
              }
              type="submit"
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5 mx-auto" />
              ) : (
                "Enter session"
              )}
            </button>
            <button
              disabled={isLoading}
              type="button"
              onClick={closeModal}
              className={
                isLoading
                  ? "text-gray-300 text-sm underline cursor-not-allowed opacity-50"
                  : "text-gray-300 text-sm underline hover:text-white cursor-pointer"
              }
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </motion.main>
  );
}
export default StartPage;
