'use client';

import React, {useCallback, useEffect, useRef, useState, MouseEvent} from 'react';
import {User} from "next-auth";
import {BsThreeDots} from "react-icons/bs";
import Avatar from "@/app/(site)/components/Avatar";
import {formatDistanceToNow} from 'date-fns'
import Button from "@/app/(site)/components/Button";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import ConversationBox from "@/app/conversations/components/ConversationBox";
import UserBox from "@/app/users/components/UserBox";
import StatusUser from "@/app/(site)/components/StatusUser";

type ProfileDrawerProps = {
  user: any,
  users: any[],
  children?: React.ReactNode
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({user,users, children}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const modalRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const { conversationId } = useConversation();
  const router = useRouter();

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleClickOutside = useCallback(
    (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseDrawer();
      }
    },
    [handleCloseDrawer]
  );

  const deleteConversation = useCallback(() => {
    setLoading(true)
    axios.delete(`/api/conversations/${conversationId}`)
      .then((res) => {
        router.push('/conversations')
        router.refresh()
      }).catch(err => {
      toast.error('Something went wrong!')
    }).finally(() => setLoading(false))
  }, [conversationId, router])

  useEffect(() => {
    if (drawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerOpen, handleClickOutside]);

  console.log(user)

  return (
    <div>

      <div onClick={handleOpenDrawer} className="cursor-pointer w-8 h-8 flex items-center justify-center ">
        {!children ? (
          <BsThreeDots/>
        ) : (
          children
        )}
      </div>

      {drawerOpen && (
        <div
          className="overflow-y-auto bg-[#00000070] animate-[opacityMy_.4s_ease-in-out_forwards] overflow-x-hidden fixed  top-0 right-0 left-0 z-50 justify-end items-end w-screen md:inset-0 h-screen ">
          <div
            className="relative w-full max-w-md max-h-full translate-x-[105%] ml-auto  animate-[rightToLeft_.5s_ease-in-out_forwards]"
            ref={modalRef}
          >
            <div className="relative bg-white rounded-l-lg   shadow dark:bg-gray-700 h-screen">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Avatar user={user} users={users}/>

                  <div>
                    <div>
                      {
                        users?.length > 2
                          ? 'Group Chat'
                          : user.name || user.email
                      }
                    </div>
                    <StatusUser email={user.email}/>

                  </div>
                </h3>
                <button onClick={handleCloseDrawer} type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="crud-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4">
                  {users?.length > 2 ? (
                    <>
                      {
                        users.map(user =>  <UserBox user={user} key={user.id} />)
                      }

                      <hr className="h-px w-full block border-0 bg-gray-600"/>

                      <Button onClick={deleteConversation} loading={loading} className={''} color={'red'}>Delete</Button>
                    </>
                  ): (
                    <>
                      <div>
                        <div className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Email</div>
                        <div className="text-white">{user.email}</div>
                      </div>
                      <hr className="h-px w-full block border-0 bg-gray-600"/>
                      <div>
                        <div className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">On a site</div>
                        <div className="text-white">{formatDistanceToNow(new Date(user.createdAt))}</div>
                      </div>
                      <hr className="h-px w-full block border-0 bg-gray-600"/>

                      <Button onClick={deleteConversation} loading={loading} className={''} color={'red'}>Delete</Button>
                    </>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDrawer;