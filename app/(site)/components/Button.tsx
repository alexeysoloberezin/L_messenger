import React from 'react';
import clsx from "clsx";

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  children: any;
  className?: string;
  onClick?: Function;
  type?: 'submit' | 'button'
  color?: 'primary' | 'red';
}

const Button: React.FC<ButtonProps> = ({ disabled,onClick, loading, children,className, color = 'primary', type = 'button' }) => {

  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        `text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none bg-primary-600`,
        className,
        disabled || loading ? 'bg-gray-500 opacity-50 cursor-not-allowed' : `bg-primary-700 hover:bg-primary-800  focus:ring-4 focus:ring-primary-300`
      )}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children || 'Submit'}
    </button>
  );
};

export default Button;
