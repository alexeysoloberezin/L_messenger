'use client';

import React, {useEffect, useRef, useState} from 'react';
import {FullConversationType, FullMessageType} from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";
import axios from "axios";

type BodyConvProps = {
  initialMessages: FullMessageType[]
}

const BodyConv: React.FC<BodyConvProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<any>(null)

  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  return (
    <div className="h-full">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
        )
      )}
      <div ref={bottomRef} className="pt-24"></div>
    </div>
  );
};

export default BodyConv;