import getUsers from "@/app/actions/getUsers";

export default async  function ChatLayout({ children }){
  const users = await getUsers()

  return (
    <div>
      <div className="text-white">123123123</div>
      { children }
    </div>
  );
};

