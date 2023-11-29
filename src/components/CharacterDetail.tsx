import React from 'react';

const CharacterDetail = () => {
  const talentData = [
    {
      name: '재능1',
      image: '/assets/images/icon/abilityIcon/T_UI_JackO_Ability_02_Common.png',
      rate: 20,
    },
    {
      name: '재능2',
      image: '/assets/images/icon/abilityIcon/T_UI_JackO_Ability_02_Common.png',
      rate: 30,
    },
    {
      name: '재능3',
      image: '/assets/images/icon/abilityIcon/T_UI_JackO_Ability_02_Common.png',
      rate: 50,
    },
  ];

  const enChangData = [
    {
      name: '재능1',
      image: '/assets/images/icon/abilityIcon/T_UI_JackO_Ability_02_Common.png',
      rate: 20,
    },
    {
      name: '재능2',
      image: '/assets/images/icon/abilityIcon/T_UI_JackO_Ability_02_Common.png',
      rate: 30,
    },
  ];

  return (
    <td colSpan={5} className="bg-gray-300 dark:bg-gray-700 dark:text-white">
      <div className="flex flex-grow w-full justify-around space-x-10">
        <div className="w-32 md:w-80 py-2 pl-2 md:pl-8 ml-[5%]">
          <h2 className="text-sm font-bold mb-2">재능 선택률</h2>
          <div className="flex flex-wrap justify-start items-center space-x-4">
            {talentData.map((talent, index) => (
              <div key={index} className=" text-center">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="h-6 w-6 md:h-10 md:w-full "
                />
                <span className="text-xs">{talent.rate}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-32 md:w-80 py-2">
          <h2 className="text-sm font-bold mb-2">각성 선택률</h2>
          <div className="flex flex-wrap justify-start items-center space-x-4">
            {talentData.map((talent, index) => (
              <div key={index} className=" text-center">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="h-6 w-6 md:h-10 md:w-10 "
                />
                <span className="text-xs">{talent.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </td>
  );
};

export default CharacterDetail;
