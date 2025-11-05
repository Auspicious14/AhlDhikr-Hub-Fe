import React from 'react';

interface SegmentedControlProps<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}

const SegmentedControl = <T extends string>({ options, value, onChange }: SegmentedControlProps<T>) => {
  return (
    <div className="flex items-center p-1 bg-gray-200 rounded-lg">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            value === option.value ? 'bg-white text-emerald-700 shadow' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;
