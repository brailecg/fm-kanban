import React from "react";

const ColumnName = ({ name = "TODO", color = "#8471F2", count = 0 }) => {
  return (
    <div className="flex items-center space-x-2 min-w-[280px] mb-4">
      <span
        style={{ backgroundColor: color }}
        className={`w-[15px] h-[15px] rounded-full`}></span>
      <p className=" font-semibold text-xs text-main-medium-grey tracking-[2.4px]">
        {name} ({count})
      </p>
    </div>
  );
};

export default ColumnName;
