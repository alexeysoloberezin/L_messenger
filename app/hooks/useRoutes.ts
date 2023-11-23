import {usePathname} from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import {useMemo} from "react";
import {FaUsers} from "react-icons/fa";
import {IoChatbubbles} from "react-icons/io5";
import {HiChat, HiUsers} from "react-icons/hi";

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()

  const routes = useMemo(() => [
    {
      name: 'Users',
      path: '/users',
      icon: HiChat,
      active: pathname === '/users'
    },
    {
      name: 'Chats',
      path: '/conversations',
      icon: HiUsers,
      active: pathname === '/conversations' || !conversationId
    },
  ], [pathname, conversationId])

  return routes
}

export default useRoutes;