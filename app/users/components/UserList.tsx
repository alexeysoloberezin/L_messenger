'use client';

import React from 'react';
import {User} from "next-auth";
import Avatar from "@/app/(site)/components/Avatar";
import Link from "next/link";
import UserBox from "@/app/users/components/UserBox";

type UserListProps = {
  users: User[]
}

const UserList: React.FC<UserListProps> = ({users}) => {
  return (
    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
      {users.map(user => (
        <UserBox user={user} key={user.id}/>
      ))}
    </ul>
  );
};

export default UserList;