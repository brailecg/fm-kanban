import React, { useState } from "react";

const ColumnCardDropArea = () => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      className={`${
        showDrop
          ? "flex w-[280px]  opacity-100 transition-all delay-200 ease-in-out h-[88px] bg-white dark:bg-main-dark-grey rounded-md p-4 mb-4"
          : "opacity-0 transition-all delay-200 ease-in-out"
      }  `}></div>
  );
};

export default ColumnCardDropArea;
