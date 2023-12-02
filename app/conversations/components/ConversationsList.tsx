'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {FullConversationType} from "@/app/types";
import {useRouter} from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import ConversationBox from "@/app/conversations/components/ConversationBox";
import {session} from "next-auth/core/routes";
import {useSession} from "next-auth/react";
import pusherClient from "@/app/libs/pusher/pusherClient";
import {find} from "lodash";

type ConversationsListProps = {
  initialItems: FullConversationType[]
}

const ConversationsList: React.FC<ConversationsListProps> = ({initialItems}) => {
  const [items, setItems] = useState(initialItems)
  const session = useSession()
  const router = useRouter()

  const {conversationId, isOpen} = useConversation()

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if(!pusherKey){
      return
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if(find(current, {id: conversationId})){
          return current
        }

        return [conversation, ...current]
      })
    }

    const updateHandler = (conversation: FullConversationType) => {
      setItems(current => current.map(currentConversation => {
        if(currentConversation.id === conversation.id){
          return {
            ...currentConversation,
            messages: conversation.messages
          }
        }
        return currentConversation
      }))
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems(current => {
        return [...current.filter(conv => conv.id !== conversation.id)]
      })

      if(conversation.id === conversationId){
        router.push('/conversations')
      }
    }

    pusherClient.subscribe(pusherKey)
    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:remove', removeHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newHandler)
      pusherClient.unbind('conversation:update', updateHandler)
      pusherClient.unbind('conversation:remove', removeHandler)
    }
  }, [pusherKey, conversationId, router])

  return (
    <div>
      {items.map(item => (
        <ConversationBox data={item} key={item.id} selected={conversationId === item.id}/>
      ))}
    </div>
  );
};

export default ConversationsList;