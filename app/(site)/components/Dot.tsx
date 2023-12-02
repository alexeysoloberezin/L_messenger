import React from 'react';
import clsx from "clsx";

const Dot: React.FC<{ classes: string }> = ({classes}) => {
  return (
    <span className={clsx(classes)}>
      <span className="relative flex h-2 w-2 ml-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
      </span>
    </span>
  );
};

export default Dot;