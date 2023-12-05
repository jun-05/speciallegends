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
      className={`absolute mb-2 -ml-1 md:ml-0 text-start tooltip  lg:max-w-[256px] min-w-[180px] w-auto  px-2 py-1 md:p-4 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg shadow-lg z-50 bottom-full left-1/2 transform md:-translate-x-1/2  ${
        position === 'left'
          ? (idx! + 1) % 3 === 0
            ? ' -translate-x-1/2'
            : ' -translate-x-[20%] tooltip_left'
          : (idx! + 1) % 3 === 1
            ? ' -translate-x-1/2'
            : (idx! + 1) % 5 === 0
              ? ' md:-translate-x-[80%] tooltip_right_md_lg'
              : ' -translate-x-[80%] tooltip_right'
      }`}
    >
      <h2 className="text-sm md:text-base font-bold pl-2 md:p-2 inline-block text-center  break-words">
        {title}
      </h2>
      <p className="p-2 text-xs md:text-sm md:inline-block break-words ">
        {infoText}
      </p>
    </div>
  );
};

export default Tooltip;
