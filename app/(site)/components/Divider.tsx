import React from 'react';
import clsx from "clsx";

const Divider: React.FC<{className?: string}> = ({className}) => {
  return (
    <hr style={{opacity: '10%'}} className={clsx(
      "my-4",
      className
    )}/>
  );
};

export default Divider;