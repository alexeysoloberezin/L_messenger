import React from 'react';

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  children: any;
  className: string;
  type?: 'submit' | 'button'
  color?: 'primary' | 'danger'; 
}

const Button: React.FC<ButtonProps> = ({ disabled, loading, children,className, color = 'primary', type = 'button' }) => {
  const buttonClasses = `${className} text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ${
    disabled || loading ? 'bg-gray-500 opacity-50 cursor-not-allowed' : `bg-primary-700 hover:bg-primary-800 dark:focus:ring-primary-800 dark:hover:bg-primary-700 focus:ring-4 focus:ring-primary-300`
  } dark:bg-primary-600`;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children || 'Submit'}
    </button>
  );
};

export default Button;
