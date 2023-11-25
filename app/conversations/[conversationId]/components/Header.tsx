'use client';

import React, {useMemo, useState} from 'react';
import {FullConversationType} from "@/app/types";
import { Conversation, User } from '@prisma/client'
import useOtherUser from "@/app/hooks/useOtherUser";
import clsx from "clsx";
import Avatar from "@/app/(site)/components/Avatar";
import { BsThreeDots } from "react-icons/bs";
import ProfileDrawer from "@/app/(site)/components/ProfileDrawer";
type HeaderConvProps = {
  conversation: FullConversationType
}

const HeaderConv: React.FC<HeaderConvProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)


  const statusText = useMemo(() => {
    if(conversation.isGroup){
      return `${conversation.users.length} members`
    }

    return 'Active'
  }, [conversation])

  return (
    <div
      className={clsx(`
        w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-3 flex items-center gap-3  justify-between 
      `)}
    >
      <div className={'flex items-center gap-3'}>
        <Avatar user={otherUser} />
        <p className="text-md font-medium text-gray-900 truncate dark:text-white">
          {otherUser?.name || otherUser?.email}
        </p>
      </div>
      <div >
        <ProfileDrawer />
        <BsThreeDots />
      </div>
    </div>
  );
};

export default HeaderConv;