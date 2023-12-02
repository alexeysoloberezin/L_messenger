'use client';

import React from 'react';
import useActiveChannel from "@/app/hooks/useActiveChannel";

const ActiveStatus = () => {
  useActiveChannel()

  return (
    <div>
      123
    </div>
  );
};

export default ActiveStatus;