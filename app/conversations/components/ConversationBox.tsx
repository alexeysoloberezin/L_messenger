'use client';

import React, {useCallback, useMemo} from 'react';
import {FullConversationType} from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Avatar from "@/app/(site)/components/Avatar";
import {User} from "next-auth";
import {format} from 'date-fns'
import clsx from "clsx";

type ConversationProps = {
  data: FullConversationType,
  selected?: boolean
}

const ConversationBox: React.FC<ConversationProps> = ({data, selected}) => {
  const otherUser = useOtherUser(data)

  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.push('/conversations/' + data.id)
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

  console.log('otherUser', otherUser)

  return (
    <div onClick={handleClick} className="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-900">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Avatar user={otherUser}/>
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {otherUser.name || otherUser.email}
            </p>
            {lastMessage?.createdAt && (
              <div className="text-sm text-white">{format(new Date(lastMessage.createdAt), 'p')}</div>
            )}
          </div>
          <p className={clsx("text-sm text-gray-900 truncate dark:text-white flex items-center gap-1", !hasSeen && 'font-medium')} >
            {!hasSeen && (
              <span class="relative flex h-2 w-2 ml-1">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
            )}
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;