'use client';

import {ReactNode} from "react";
import Sidebar from "../components/core/Sidebar";
import {Header} from "@/app/(site)/components/core/Header";

const MainLayout: React.FC<{ children: ReactNode }> = ({children, list}) => {
  return (
    <div>
      <Header/>

      <div class="flex mt-[64px]">
        <Sidebar/>
        {list &&
          <div
            class="w-[22vw] min-w-[350px] h-screen  bg-white border border-l-0 border-gray-200  shadow  dark:bg-gray-800 dark:border-gray-700">
            {list}
          </div>
        }

        <div class="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;