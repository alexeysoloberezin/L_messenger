import React from 'react';
import {FullConversationType} from "@/app/types";

type ConversationProps = {
  data: FullConversationType,
  selected?: boolean
}

const ConversationBox: React.FC<ConversationProps> = ({ data, selected }) => {
  return (
    <div>
      {data.messages}
    </div>
  );
};

export default ConversationBox;