import React from 'react';

interface TooltipProps {
  title: string;
  infoText: string;
  idx?: number;
  position?: 'left' | 'right';
}

const Tooltip = ({ title, infoText, idx, position }: TooltipProps) => {
  return (
    <div
      className={`flex flex-col absolute mb-2 -ml-1 md:ml-0 text-start tooltip  max-w-[256px] w-auto  px-2 py-1 md:p-4 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg shadow-lg z-50 bottom-full left-1/2 transform sm:-translate-x-1/2  ${
        position === 'left'
          ? (idx! + 1) % 3 === 0
            ? ' -translate-x-1/2'
            : (idx! + 1) % 5 === 1
              ? '-translate-x-[20%] sm:-translate-x-[20%] tooltip_left_sm'
              : ' -translate-x-[20%] tooltip_left'
          : (idx! + 1) % 3 === 1
            ? ' -translate-x-1/2'
            : (idx! + 1) % 5 === 0
              ? '-translate-x-[80%] sm:-translate-x-[80%] tooltip_right_sm'
              : ' -translate-x-[80%] tooltip_right'
      }`}
    >
      <h2 className="w-max max-w-full text-sm md:text-base font-bold pl-2 md:p-2 break-words">
        {title}
      </h2>
      <p className="w-max max-w-full p-2 text-xs md:text-sm  break-words ">
        {infoText}
      </p>
    </div>
  );
};

export default Tooltip;
