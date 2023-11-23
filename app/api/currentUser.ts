import prisma from '@/app/libs/prismadb';
import {useSession} from "next-auth/react";

export default async function handler(req, res) {
  const { data:session } = useSession()

  if(!session?.user?.email){
    res.status(200).json(null)
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email as string
    }
  });

  if(!currentUser){
    res.status(200).json(null)
  }

  res.status(200).json({ currentUser });
}
