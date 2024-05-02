import React from "react";

const ColumnItem = ({ item }) => {
  return (
    <div className="w-[280px] min-h-[88px] bg-white dark:bg-main-dark-grey rounded-md flex flex-col justify-center  px-4 py-[23px] cursor-grab active:opacity-70 active:border active:border-main-purple-hover mb-4">
      <p className="text-[15px] font-semibold dark:text-white">
        {item.cardName}
      </p>
      <p className=" text-main-medium-grey text-xs font-semibold">
        {item.cardDescription}
      </p>
    </div>
  );
};

export default ColumnItem;
