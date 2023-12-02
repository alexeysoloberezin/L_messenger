'use client';

import React, {useCallback, useMemo, useState} from 'react';
import {FullConversationType} from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Avatar from "@/app/(site)/components/Avatar";
import {User} from "next-auth";
import {format} from 'date-fns'
import clsx from "clsx";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import Dot from "@/app/(site)/components/Dot";

type ConversationProps = {
  data: FullConversationType,
  selected?: boolean
}

const ConversationBox: React.FC<ConversationProps> = ({data, selected}) => {
  const otherUser = useOtherUser(data)
  const [loading, setLoading] = useState(false)
  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(async () => {
    setLoading(true)
    await router.push('/conversations/' + data.id)
    setLoading(false)
  }, [router, data.id])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])

  const userEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email])

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || []

    if (!userEmail) {
      return false
    }

    return seenArray.filter(user => user?.email === userEmail).length !== 0
  }, [lastMessage, userEmail])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image'
    }

    if (lastMessage?.body) {
      return lastMessage.body
    }

    return "Started a conversation"
  }, [lastMessage])

  if(data.isGroup){
    console.log('data', data.isGroup, data)
  }

  return (
    <div onClick={handleClick} className="relative">
      <div className={clsx("flex items-center py-3 px-4 sm:py-4 ", loading ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-900')}>
        <div className="flex-shrink-0">
          <Avatar user={otherUser} users={data.isGroup ? data.users : []}/>
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {
                data.isGroup
                  ? 'Group Chat'
                  : otherUser.name || otherUser.email
              }
            </p>
            {lastMessage?.createdAt && (
              <div className="text-sm text-white">{format(new Date(lastMessage.createdAt), 'p')}</div>
            )}
          </div>
          <p className={clsx("text-sm text-gray-900 truncate dark:text-white flex items-center gap-1", !hasSeen && 'font-medium')} >
            {!hasSeen && (
              <Dot />
            )}
            {lastMessageText}
          </p>
        </div>
      </div>
      {loading && (
        <div className={'animate-spin absolute top-[50%] left-[50%] z-5 text-white'}><AiOutlineLoading3Quarters /></div>
      )}
    </div>
  );
};

export default ConversationBox;