import {useSession} from "next-auth/react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'
import {FullConversationType} from "@/app/types";

const getConversations = async (): Promise<FullConversationType[] | []> => {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) {
    return []
  }

  try {
    const conversations: any = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc'
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          }
        }
      }
    })

    return conversations || []
  } catch (err) {
    return []
  }
}

export default getConversations;