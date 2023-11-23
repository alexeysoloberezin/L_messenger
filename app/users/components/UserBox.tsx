'use client';

import React, {useCallback, useState} from 'react';
import {User} from "next-auth";
import Avatar from "@/app/(site)/components/Avatar";
import axios from "axios";
import {useRouter} from "next/navigation";

type UserListProps = {
  user: User
}

const UserBox: React.FC<UserListProps> = ({user}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)

    axios.post('/api/conversations', {
      userId: user.id
    })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`)
      })
      .finally(() => setIsLoading(false))
  }, [user, router])

  return (
    <li onClick={handleClick} className="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-900">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <Avatar user={user}/>
        </div>
        <div class="flex-1 min-w-0 ms-4">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            {user.name}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            {user.email}
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          STATUS**
        </div>
      </div>
    </li>
  );
};

export default UserBox;