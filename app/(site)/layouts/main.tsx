'use client';

import {ReactNode, useMemo, useState} from "react";
import Sidebar from "../components/core/Sidebar";
import {Header} from "@/app/(site)/components/core/Header";
import clsx from "clsx";
import { FaUsersGear } from "react-icons/fa6";
import SquareBtn from "@/app/(site)/components/SquareBtn";
import Modal from "@/app/(site)/components/Modal";
import Input from "@/app/(site)/components/Input";
import MySelect, {OptionSelect} from "@/app/(site)/components/Select/MySelect";
import Button from "@/app/(site)/components/Button";
import CreateGroupChat from "@/app/(site)/components/Modals/CreateGroupChat";


type MainLayoutProps = {
  children: ReactNode,
  list?: ReactNode,
  users?: OptionSelect[]
}

const MainLayout: React.FC<MainLayoutProps> = ({children, list, users}) => {
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

  const temp = {}


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
            <div className="flex items-center pt-4 pb-2 px-5 justify-between">
              <div className="text-white text-xl ">
                Messages:
              </div>
              <div>
                {users?.length && (
                  <CreateGroupChat users={users} />
                )}
              </div>
            </div>
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