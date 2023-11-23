import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function getSession(){
  // return null
  return await getServerSession(authOptions as any);
}
