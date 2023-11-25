import { FullConversationType } from "@/app/types";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

type OtherUserType = User;

const useOtherUser = (
  conversation: FullConversationType | {
    users: User[];
  }
): OtherUserType => {
  const session = useSession();

  return useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const user = conversation.users.filter((user) => user.email !== currentUserEmail);

    return user[0]
  }, [session?.data?.user?.email, conversation.users]);
};

export default useOtherUser;
