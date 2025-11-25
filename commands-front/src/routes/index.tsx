import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "../components/LandingPage";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import StartSessionModal from "../components/StartSessionModal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const links = [
    { to: "/audience", label: "Audience" },
    { to: "/actor", label: "Actor" },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [option, setOption] = useState<"Actor" | "Audience" | "Director" | "">(
    ""
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    console.log("Option selected: ", option);
    if (option) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [option]);

  return (
    <div className=" flex flex-col items-center justify-center">
      <div>
        <p className="sr-only">placeholder</p>
      </div>
      <div className="z-20 bg-black rounded-md p-8 mt-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          ref={ref}
          className=" flex flex-col items-center justify-center h-[70vh]"
        >
          <h1 className=" text-4xl font-bold">What are you?</h1>
          <div className=" mt-8 flex flex-row gap-4">
            {links.map(({ to, label }) => (
              <div
                onClick={() => setOption(label as "Actor" | "Audience")}
                className=" border-2 p-4 rounded-md w-[150px] text-center hover:bg-slate-500 text-2xl"
                key={to}
              >
                {label}
              </div>
            ))}
          </div>
          <span className="mt-10 text-slate-500">
            or are you the{" "}
            <span
              onClick={() => setOption("Director")}
              className="underline hover:text-slate-100 cursor-pointer"
            >
              director?
            </span>
          </span>
        </motion.div>
      </div>
      <div>
        <p className="sr-only">placeholder</p>
      </div>
      <LandingPage parentInView={inView} />
      {modalOpen && (
        <StartSessionModal
          theatreFunction={option}
          setOpen={() => setModalOpen(false)}
          setOption={() => setOption("")}
        />
      )}
    </div>
  );
}
