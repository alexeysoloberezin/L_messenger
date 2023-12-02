import React, { ReactNode } from 'react';
import getUsers from "@/app/actions/getUsers";

interface ChatLayoutProps {
  children: ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const users = await getUsers();

  return (
    <div>
      <div className="text-white">123123123</div>
      {children}
    </div>
  );
};
