import { Conversation, User, Message } from '@prisma/client';

export type FullMessageType = Message & {
  id: string;
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  id: string;
  isGroup: boolean;
  users: User[];
  messages: FullMessageType[];
};
