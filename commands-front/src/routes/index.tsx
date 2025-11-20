import { createFileRoute, Link } from "@tanstack/react-router";
//import LandingPage from "../components/LandingPage";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const links = [
    { to: "/audience", label: "Audience" },
    { to: "/actor", label: "Actor" },
  ];
  return (
    <>
      <div className="flex flex-col items-center justify-between h-[70vh]">
        <div>
          <p className="sr-only">placeholder</p>
        </div>
        <div className=" flex flex-col items-center justify-center">
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
      </div>
      {/* <LandingPage/> */}
    </>
  );
}
