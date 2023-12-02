'use client';

import React, {useMemo} from 'react';
import {FullConversationType} from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import clsx from "clsx";
import Avatar from "@/app/(site)/components/Avatar";
import ProfileDrawer from "@/app/(site)/components/ProfileDrawer";
import StatusUser from "@/app/(site)/components/StatusUser";

type HeaderConvProps = {
  conversation: FullConversationType
}

const HeaderConv: React.FC<HeaderConvProps> = ({conversation}) => {
  const otherUser = useOtherUser(conversation)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
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
        <Avatar user={otherUser} users={conversation.isGroup ? conversation.users : []}/>

        <div>
          <p className="text-md font-medium text-gray-900 truncate dark:text-white">
            {
              conversation?.isGroup
                ? 'Group Chat: ' + conversation.users.length + ' members'
                : otherUser?.name || otherUser?.email
            }
          </p>
          <StatusUser email={otherUser.email}/>
        </div>

      </div>
      <div>
        {otherUser && (
          <ProfileDrawer user={otherUser} users={conversation.users}/>
        )}
      </div>
    </div>
  );
};

export default HeaderConv;