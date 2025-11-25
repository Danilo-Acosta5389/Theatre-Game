import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
//import { useState } from "react";
import {motion} from "motion/react";

const RootLayout = () => {
  //const [isShowingMenu, setIsShowingMenu] = useState(true);

  return (
    <div
    className="w-full bg-black text-white overflow-x-hidden">
      <motion.div className="w-full p-5 flex gap-5 bg-blue-900/30 backdrop-blur-sm border-b border-white/10">
        <Link to="/" className="[&.active]:font-bold">
          Start
        </Link>{" "}
        <Link to="/audience" className="[&.active]:font-bold">
          Audience
        </Link>{" "}
        <Link to="/actor" className="[&.active]:font-bold">
          Actor
        </Link>
      </motion.div>

      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
