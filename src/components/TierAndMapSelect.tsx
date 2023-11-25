/* eslint-disable @next/next/no-img-element */
import { MapIcon, TierIcon } from '@/constants/images';
import React from 'react';

interface TierAndMapSelectProps {
  option: {
    selectedTier: string;
    selectedMap: number;
  };
  onChangeTier: (tier: string) => void;
  onChangeMap: (map: number) => void;
}

const TierAndMapSelect = ({
  option,
  onChangeTier,
  onChangeMap,
}: TierAndMapSelectProps) => {
  const tierList = [
    { master: '마스터' },
    { diamond: '다이아몬드' },
    { platinum: '플래티넘' },
    { gold: '골드' },
    { silver: '실버' },
    { bronze: '브론즈' },
  ];
  const mapList = [
    { 4000: '전체' },
    { 4003: '버려진 해적선 - 정오' },
    { 4005: '버려진 해적선 - 석양' },
    { 4006: '버려진 해적선 - 심야' },
    { 4007: '버려진 해적선 - 비' },
    { 4008: '비허가 스페이스독 - 성층권' },
    { 4009: '비허가 스페이스독 - 석양' },
  ];

  const selectedTierIcon =
    TierIcon[option.selectedTier as keyof typeof TierIcon];
  const selectedMapIcon = MapIcon[option.selectedMap as keyof typeof MapIcon];

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <select
          className="mr-2 h-10 md:h-11  p-2 w-22 md:w-48 lg:w-40 text-xs md:text-sm lg:text-base border border-gray-200 rounded"
          onChange={(e) => onChangeTier(e.target.value)}
        >
          <option value="master">티어 선택</option>
          {tierList.map((tier, idx) => (
            <option key={`tier_${idx}`} value={Object.keys(tier)}>
              {Object.values(tier)}
            </option>
          ))}
        </select>
        <select
          className="p-2  h-10  md:h-11 w-32 lg:w-60 md:w-48 text-xs md:text-sm lg:text-base  border border-gray-200 rounded"
          onChange={(e) => onChangeMap(Number(e.target.value))}
        >
          <option value="4000">맵 선택</option>
          {mapList.map((map, idx) => (
            <option key={`map_${idx}`} value={Object.keys(map)}>
              {Object.values(map)}
            </option>
          ))}
        </select>
      </div>
      <div className="group flex space-x-2 md:space-x-8 md:mr-7">
        <img
          src={selectedTierIcon.url}
          alt={selectedTierIcon.name}
          className="rounded-md object-fill h-10 w-10 md:h-14 md:w-14"
        />
        <img
          src={selectedMapIcon.url}
          alt={selectedMapIcon.name}
          className={`h-10 w-10 md:h-14 md:w-14
          ${
            option.selectedMap !== 4000
              ? 'transition-all duration-500 ease-in-out transform group-hover:scale-x-[2] rounded-md object-fill'
              : ''
          }  `}
        />
      </div>
    </div>
  );
};

export default TierAndMapSelect;
