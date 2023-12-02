import prisma from '@/app/libs/prismadb';
import getSession from "@/app/actions/getSession";

export default async function handler(req: any, res: any) {
  const session: any = await getSession();

  if(!session?.user?.email){
    res.status(200).json(null)
    return;
  }

  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    res.status(200).json({ currentUser });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
