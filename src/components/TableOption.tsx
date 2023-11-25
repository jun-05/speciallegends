import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';

interface TableOptionProps {
  sortOption: { sortType: string; order: string };
  onClickSort: (sortType: string) => void;
}

const TableOption = ({ sortOption, onClickSort }: TableOptionProps) => (
  <thead className="w-full border-b-2">
    <tr>
      <th className="w-[10%]">#</th>
      <th className="w-[50%] md:w-[60%] text-left pl-4 md:pl-8">캐릭터네임</th>
      <th className="w-[20%] md:w-[15%] ">
        <div className="inline-flex items-center space-x-1 pl-2">
          <span>픽률</span>
          <div
            onClick={() => onClickSort('pickRate')}
            className="hover:cursor-pointer"
          >
            {sortOption.order === 'desc' ? (
              <MdOutlineKeyboardArrowDown size={20} />
            ) : (
              <MdOutlineKeyboardArrowUp size={20} />
            )}
          </div>
        </div>
      </th>
      <th className="w-[20%] md:w-[15%]">
        <div className="inline-flex items-center space-x-1 pl-2 ">
          <span>승률</span>
          <div
            onClick={() => onClickSort('winRate')}
            className="hover:cursor-pointer"
          >
            {sortOption.order === 'desc' ? (
              <MdOutlineKeyboardArrowDown size={20} />
            ) : (
              <MdOutlineKeyboardArrowUp size={20} />
            )}
          </div>
        </div>
      </th>
    </tr>
  </thead>
);

export default TableOption;
