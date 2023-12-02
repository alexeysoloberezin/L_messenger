import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/authOption";

export default async function getSession(){
  // return null
  return await getServerSession(authOptions as any);
}
