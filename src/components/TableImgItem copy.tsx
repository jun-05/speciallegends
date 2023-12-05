/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import Tooltip from './common/Tooltip';

interface TableImgItemImgProps {
  src: string;
  alt: string;
  UsageRate: number | undefined;
  tooltipTitle: string;
  tooltipInfo: string;
}

const TableImgItem = ({
  src,
  alt,
  UsageRate,
  tooltipTitle,
  tooltipInfo,
}: TableImgItemImgProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = () => window.innerWidth < 768;

  const handleMouseEnter = () => {
    if (!isMobile()) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile()) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    if (isMobile()) {
      setIsHovered(!isHovered);
    }
  };

  const containerClassName =
    'img-container_' + alt.replace(/\s+/g, '_').toLowerCase();

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(`.${containerClassName}`)) {
        setIsHovered(false);
      }
    };
    window.addEventListener('click', clickOutside);

    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, [alt, containerClassName]);

  return (
    <div
      className={`${containerClassName} relative  text-start md:text-center p-1 md:ml-2 first:ml-0`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="w-full h-full">
        <img
          src={src}
          alt={alt}
          className={`h-6 w-6 md:h-10 md:w-10 object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <span className="text-xs inline-block w-8">{UsageRate}%</span>
      {isHovered && <Tooltip title={tooltipTitle} infoText={tooltipInfo} />}
    </div>
  );
};

export default TableImgItem;