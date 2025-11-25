import { useState } from "react";
import { isValidSessionId, makeRandomSessionId } from "../utils/session";
import { Loader } from "lucide-react";
import { motion } from "motion/react";

export default function StartSessionModal({
  theatreFunction,
  setOpen,
  setOption,
}: {
  theatreFunction: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOption: React.Dispatch<React.SetStateAction<"">>;
}) {
  //const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(() => makeRandomSessionId());
  const [isLoading, setIsLoading] = useState(false); // dont forget to set isLoading properly

  function closeModal() {
    setTimeout(() => setSessionId(makeRandomSessionId()), 200);
    setOption("");
    setOpen(false);
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

    // navigate({
    //   to: "/" + theatreFunction + "/$sessionId/",
    //   params: { sessionId },
    // });
    console.log("Choosed: " + theatreFunction);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <div
        onClick={closeModal}
        className="fixed inset-0 flex justify-center items-center z-50
      bg-black/50"
      >
        <div
          className="bg-gray-900 p-6 rounded-lg flex flex-col gap-4 min-w-[300px] border border-white
        transition-all duration-200"
        >
          <form
            action={goToSession}
            className={` p-6 flex flex-col gap-4 min-w-[300px]  `}
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
          </form>
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
        </div>
      </div>
    </motion.div>
  );
}
