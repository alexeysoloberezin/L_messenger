import prisma from '@/app/libs/prismadb'
import getSession from "@/app/actions/getSession";
import {User} from "next-auth";

const getCurrentUser = async (): Promise<User | null> => {
  const session = await getSession()

  if(!session?.user?.email){
    return null
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email as string
    }
  })

  return currentUser || null
}

export default getCurrentUser;