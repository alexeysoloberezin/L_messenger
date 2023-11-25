'use client';

import React from 'react';
import useConversation from "@/app/hooks/useConversation";

const ConversationsPage = () => {
  const { isOpen } = useConversation()

  return (
    <div>
      empty
    </div>
  );
};

export default ConversationsPage;