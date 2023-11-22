'use clinet';

import clsx from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ label, id, type = "text", required, register, errors, disabled }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        className={clsx(
          "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          { "border-red-500": errors[id] },
          { "opacity-50": disabled }
        )}
        placeholder={`Enter your ${label.toLowerCase()}`}
        {...register(id, { required })}
        disabled={disabled}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">{label} is required.</p>
      )}
    </div>
  );
}

export default Input;
