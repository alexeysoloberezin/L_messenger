'use client';

import {ReactNode, useMemo, useState} from "react";
import Sidebar from "../components/core/Sidebar";
import {Header} from "@/app/(site)/components/core/Header";
import clsx from "clsx";

const MainLayout: React.FC<{ children: ReactNode }> = ({children, list}) => {
  const [widths, setWidths] = useState({
    sidebar: 8,
    list: 20,
  })

  const getWidths = useMemo(() => {
    return {
      ...widths,
      chat: 100 - (widths.sidebar + widths.list)
    }
  }, [widths])

  const gridTemplateColumns = `minmax(120px, ${getWidths.sidebar}vw) minmax(250px, ${getWidths.list}vw) minmax(500px, ${getWidths.chat}vw)`;

  return (
    <div>
      <Header/>

      <div  className={clsx("pt-[64px]", "grid", "mainLayout")}
            style={{ gridTemplateColumns }}>
        <div >
          <Sidebar/>
        </div>
        {list &&
          <div
            className={clsx(`h-screen border border-l-0 border-gray-200  shadow  bg-spaceGray-450 border-gray-700`)}>
            {list}
          </div>
        }

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;