import {FullConversationType} from "@/app/types";
import {User} from "next-auth";
import {useSession} from "next-auth/react";
import {useMemo} from "react";

const useOtherUser = (conversation: FullConversationType | {
  users: User[]
}) => {
  const session = useSession()

  return useMemo(() => {
    const currentUserEmail = session?.data?.user?.email

    return conversation.users.filter(user => user.email !== currentUserEmail)
  }, [session?.data?.user?.email, conversation.users])
}

export default useOtherUser