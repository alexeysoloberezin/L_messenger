import React from 'react';
import useActiveList from "@/app/hooks/useActiveList";

const StatusUser: React.FC<{ email?: string }> = ({email}) => {
  const {members} = useActiveList()
  const isActive = members.indexOf(email) !== -1

  return (
    <p className="text-sm opacity-50">
      {isActive ? 'Active' : 'Offline'}
    </p>
  );
};

export default StatusUser;