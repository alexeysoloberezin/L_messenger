const Pusher: any = require('pusher')

const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  useTLS: true,
  cluster: 'mt1'
});

export default pusherServer;