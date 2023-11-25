import React from 'react';
import clsx from "clsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  children: any;
  className?: string;
  type?: 'submit' | 'button'
  color?: 'primary' | 'danger';
}

const SquareButton: React.FC<ButtonProps> = ({ disabled, loading, children,className, color = 'primary', type = 'button' }) => {
  const buttonClasses = clsx(
    "bg-gray-700 transition p-2 h-[42px] w-[42px] mr-2 rounded flex justify-center items-center ml-2 ",
    loading || disabled ? "opacity-50 cursor-not-allowed" : "bg-spaceGray-600 hover:bg-sky-600 focus:ring-4 focus:ring-primary-300"
  )

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className={'animate-spin'}><AiOutlineLoading3Quarters /></div>
      ) : children || 'Submit'}
    </button>
  );
};

export default SquareButton;
