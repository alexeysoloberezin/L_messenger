// Import necessary dependencies and styles
import React from 'react';
import getConversationsById from "@/app/actions/getConversationsById";
import getMessages from "@/app/actions/getMessages";
import HeaderConv from "@/app/conversations/[conversationId]/components/Header";
import BodyConv from "@/app/conversations/[conversationId]/components/Body";
import Form from "@/app/conversations/[conversationId]/components/Form";
import {FullConversationType, FullMessageType} from "@/app/types";

type IParams = {
  conversationId: string
}

const ConversationIdPage = async ({ params }: {params: IParams}) => {
  const conversation = await getConversationsById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  if(!conversation){
    return (
      <div className="text-white">conversation is empty</div>
    )
  }

  return (
    <div className="text-white h-withoutHeader" style={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderConv conversation={conversation as FullConversationType} />
      <div style={{ flex: 1, overflowY: 'auto' }} className="bg-spaceGray-550 ">
        <BodyConv initialMessages={messages as FullMessageType[]} />
      </div>
      <Form />
    </div>
  );
};

export default ConversationIdPage;
