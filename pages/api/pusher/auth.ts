import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";

import pusherServer from "@/app/libs/pusher/pusherServer";
import {authOptions} from "@/app/api/authOption";

export default async function handler(
  request: any,
  response: any
) {
  return response.status(200).json([])
  const session: any = await getServerSession(request, response, authOptions as any);

  if(!session.user?.email) {
    return response.status(401);
  }

  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;

  const data = {
    user_id: session.user.email
  }

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return response.status(200).json(authResponse);
}