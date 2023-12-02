'use client';

import React from 'react';
import useActiveList from "@/app/hooks/useActiveList";
import Dot from "@/app/(site)/components/Dot";

const Avatar: React.FC<{ user: any, users?: any[] }> = ({user, users}) => {
  const {members} = useActiveList()
  const isActive = members.indexOf(user?.email!) !== -1

  return (
    <div>
      {users?.length > 2 ? (
        <div className="flex items-center -space-x-4 rtl:space-x-reverse">
          {users.slice(0, 2).map(el => (
            el?.image ? (

              <div className="relative">
                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-600"
                     src={el.image} alt=""
                />
                <Dot classes={"absolute t-0 top-0"}/>
              </div>

            ) : (
              <svg className="w-9 h-9 text-gray-400 border-2 rounded-full dark:border-gray-600 bg-gray-800"
                   fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"></path>
              </svg>
            )
          ))}
          {users.length > 2 && (
            <div
              className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
              + {users.length - 2}
            </div>
          )}

        </div>
      ) : (
        <div className="relative">
          {isActive && (
            <Dot classes={"absolute t-0 top-0 z-10"}/>
          )}
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            {user?.image
              ? <img src={user.image} alt={'Avatar'}/>
              : <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"></path>
              </svg>
            }
          </div>
        </div>
      )}
    </div>

  );
}

export default Avatar;