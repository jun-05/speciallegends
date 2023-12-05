import React from 'react';

interface TooltipProps {
  title: string;
  infoText: string;
}

const Tooltip = ({ title, infoText }: TooltipProps) => {
  return (
    <div className="absolute mb-2 -ml-1 md:ml-0 text-start tooltip w-64 md:w-64  px-2 py-1 md:p-4 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg shadow-lg bottom-full left-1/2 transform -translate-x-1/2 z-50">
      <h2 className="text-sm md:text-base font-bold pl-2 md:p-2 inline-block text-center sm:w-auto break-words">
        {title}
      </h2>
      <p className="p-2 text-xs md:text-sm md:inline-block break-words  w-full">
        {infoText}
      </p>
    </div>
  );
};

export default Tooltip;
