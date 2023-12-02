import Pusher from "pusher-js";

const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
  cluster: 'mt1',
  channelAuthorization: {
    endpoint: '/api/pusher/auth',
    transport: 'ajax'
  }
});

export default pusherClient;