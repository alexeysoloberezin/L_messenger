import getUsers from "@/app/actions/getUsers";
import MainLayout from "@/app/(site)/layouts/main";
import UserList from "@/app/users/components/UserList";
import {ReactNode} from "react";

export default async function UsersLayout({children}: {children: ReactNode}) {
  const users = await getUsers()

  return (
    <MainLayout list={<UserList users={users}/>}>
      <div>
        {children}
      </div>
    </MainLayout>
  );
};

