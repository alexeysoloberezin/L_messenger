import React from 'react';
import useActiveList from "@/app/hooks/useActiveList";

const StatusUser: React.FC<{ email: string | null | undefined }> = ({email}) => {
  const {members} = useActiveList()
  const isActive = email ? members.indexOf(email) !== -1 : false

  return (
    <p className="text-sm opacity-50">
      {isActive ? 'Active' : 'Offline'}
    </p>
  );
};

export default StatusUser;