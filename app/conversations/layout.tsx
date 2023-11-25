import React from 'react';
import ConversationsList from "@/app/conversations/components/ConversationsList";
import getConversations from "@/app/actions/getConversations";
import MainLayout from "@/app/(site)/layouts/main";
import ConversationsPage from "@/app/conversations/page";

const ConversationLayout = async ({ children }) => {
  const conversations = await getConversations()

  return (
    <div>
      <MainLayout list={<ConversationsList initialItems={conversations}/>}>
        <div>
          {children}
        </div>
      </MainLayout>
    </div>
  );
};

export default ConversationLayout;