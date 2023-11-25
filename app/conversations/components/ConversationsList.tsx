'use client';

import React, {useState} from 'react';
import {FullConversationType} from "@/app/types";
import {useRouter} from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import ConversationBox from "@/app/conversations/components/ConversationBox";

type ConversationsListProps = {
  initialItems: FullConversationType[]
}

const ConversationsList: React.FC<ConversationsListProps> = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems)

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()

  return (
    <div>
      {items.map(item => (
        <ConversationBox data={item} key={item.id} selected={conversationId === item.id}/>
      ))}
    </div>
  );
};

export default ConversationsList;