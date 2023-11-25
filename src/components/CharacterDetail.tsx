import React from 'react';

interface CharacterDetailProps {
  characterId: string;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ characterId }) => (
  <div className=" p-4 bg-white  rounded">
    <h2 className="text-xl">{characterId} 상세 정보</h2>
    {/* 상세 정보를 여기에 표시 */}
  </div>
);

export default CharacterDetail;
