import React from 'react';
import ConversationsList from "@/app/conversations/components/ConversationsList";
import getConversations from "@/app/actions/getConversations";
import MainLayout from "@/app/(site)/layouts/main";

const ConversationLayout = async () => {
  const conversations = await getConversations()

  return (
    <div>
      <MainLayout list={<ConversationsList initialItems={conversations}/>}>
        <div>

        </div>
      </MainLayout>
    </div>
  );
};

export default ConversationLayout;