import NextAuth  from 'next-auth';
import {authOptions} from "@/app/api/authOption";

const handler =  NextAuth(authOptions);

export { handler as GET, handler as POST }
