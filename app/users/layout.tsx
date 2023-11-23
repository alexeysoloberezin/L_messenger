import getUsers from "@/app/actions/getUsers";
import MainLayout from "@/app/(site)/layouts/main";
import UserList from "@/app/users/components/UserList";

export default async function UsersLayout({children}) {
  const users = await getUsers()

  return (
    <MainLayout list={<UserList users={users}/>}>
      <div>
        {children}
      </div>
    </MainLayout>
  );
};

