import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

const getConversationsById = async (conversationId: string) => {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) {
    return null
  }

  try {
    return await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
      }
    })
  } catch (err) {
    return null
  }
}

export default getConversationsById;