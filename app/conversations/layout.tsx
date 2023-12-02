import React from 'react';
import ConversationsList from "@/app/conversations/components/ConversationsList";
import getConversations from "@/app/actions/getConversations";
import MainLayout from "@/app/(site)/layouts/main";
import ConversationsPage from "@/app/conversations/page";
import getUsers from "@/app/actions/getUsers";

const ConversationLayout = async ({ children }) => {
  const conversations = await getConversations()
  const users = await getUsers()

  return (
    <div>
      <MainLayout
        list={<ConversationsList initialItems={conversations}/>}
        users={users.map(user => ({ label: user.name, value: user.id }))}
      >
        <div>
          {children}
        </div>
      </MainLayout>
    </div>
  );
};

export default ConversationLayout;