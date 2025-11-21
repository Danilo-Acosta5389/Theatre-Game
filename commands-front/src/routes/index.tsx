import { createFileRoute, Link } from "@tanstack/react-router";
import LandingPage from "../components/LandingPage";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const links = [
    { to: "/audience", label: "Audience" },
    { to: "/actor", label: "Actor" },
  ];

  const { ref, inView } = useInView();

  useEffect(() => {
    console.log("parent in view: " + inView);
  }, [inView]);
  console.log("parent in view: " + inView);
  return (
    <div ref={ref} className="flex flex-col items-center justify-center ">
      <div>
        <p className="sr-only">placeholder</p>
      </div>
      <div className=" flex flex-col items-center justify-center h-[70vh]">
        <h1 className=" text-4xl font-bold">What are you?</h1>
        <div className=" mt-8 flex flex-row gap-4">
          {links.map(({ to, label }) => (
            <Link
              to={to}
              className=" border-2 p-4 rounded-md w-[150px] text-center hover:bg-slate-500 text-2xl"
              key={to}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <p className="sr-only">placeholder</p>
      </div>
      <LandingPage parentInView={inView} />
    </div>
  );
}
