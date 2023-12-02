'use client';

import React, {useEffect, useRef, useState} from 'react';
import {FullConversationType, FullMessageType} from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";
import axios from "axios";
import {find} from "lodash";
import Pusher from "pusher-js";
import pusherClient from "@/app/libs/pusher/pusherClient";

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

  useEffect(() => {

  }, [])


  //
  // var channel = pusher.subscribe('my-channel');
  // channel.bind('my-event', function(data) {
  //   alert(JSON.stringify(data));
  // });

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    // bottomRef?.current?.scrollIntoView()

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMessages((current) => {
        if(find(current, { id: message.id })){
          return current
        }
        return [...current,message]
      })

      // bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map(currentMessage => {
        if(currentMessage.id === newMessage.id){
          return newMessage;
        }
        return currentMessage
      }))
    }

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:new', updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:new', updateMessageHandler)
    }
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