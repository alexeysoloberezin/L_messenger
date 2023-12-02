import React from 'react';
import Select from 'react-select'

export interface OptionSelect {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  id: string;
  options: OptionSelect[];
  required?: boolean;
  onChange: (value: Record<string, any>) => void;
  disabled?: boolean;
  multiple?: boolean;
}

const darkThemeStyles = {
  container: (provided) => ({
    ...provided,
    color: 'white', // Text color
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'rgb(55,65,81)', // Control background color
    borderColor: '#4B5563', // Control border color
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'rgb(63,73,91)' : 'rgb(55,65,81)', // Selected and default option background color
    color: state.isSelected ? 'white' : 'inherit', // Selected and default option text color
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white', // Selected value text color
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#4B5563', // Multi-value tag background color
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white', // Multi-value tag text color
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white', // Multi-value tag remove button color
  }),
};

const MySelect: React.FC<SelectProps> = ({ label,multiple , id,onChange, options, required, disabled }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Select
        isMulti
        isDisabled={disabled}
        name={id}
        onChange={onChange}
        options={options as any}
        className="w-full bg-gray-700"
        classNamePrefix="select"
        styles={darkThemeStyles}
      />
    </div>
  );
};

export default MySelect;
