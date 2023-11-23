'use clinet';

import {FaUsers} from "react-icons/fa";
import {IoChatbubbles} from "react-icons/io5";
import Link from "next/link";
import useRoutes from "@/app/hooks/useRoutes";

const Sidebar = () => {
  const nav = useRoutes()

  return (
    <aside id="logo-sidebar"
           className="z-40 w-[11vw] max-w-[240px] min-w-[150px] h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
           aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">

          {nav.map(navItem => (
            <li key={navItem.name}>
              <Link
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                href={navItem.path}
              >
                { navItem.icon }
                <span className="ms-3">{navItem.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;