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
    <div onClick={handleClick} className="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-900">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Avatar user={user}/>
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {user.email}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {/*STATUS***/}
        </div>
      </div>
    </div>
  );
};

export default UserBox;