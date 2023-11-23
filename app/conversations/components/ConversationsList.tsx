'use client';

import React, {useState} from 'react';
import {FullConversationType} from "@/app/types";
import {useRouter} from "next/navigation";
import useConversation from "@/app/hooks/useConversation";

type ConversationsListProps = {
  initialItems: FullConversationType[]
}

const ConversationsList: React.FC<ConversationsListProps> = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems)

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()

  return (
    <div>
      {JSON.stringify(items)}
    </div>
  );
};

export default ConversationsList;