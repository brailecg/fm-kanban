import React, { useEffect, useState } from "react";
import ColumnItem from "./ColumnItem";

import ColumnCardDropArea from "./ColumnCardDropArea";
const ColumnArea = ({ column, columns }) => {
  const [cols, setCols] = useState(columns);
  const [col, setCol] = useState(column);
  useEffect(() => {
    setCols(columns);
    setCol(column);
  }, [column, columns]);

  return (
    <div className="flex flex-col ">
      <ColumnCardDropArea
        id={col.columnId + "-0"}
        colId={col.columnId}
        idx={0}
      />
      {col.cards.map((item, index) => {
        return (
          <React.Fragment key={item.cardId}>
            <ColumnItem col={item} colId={col.columnId} cols={cols} />
            <ColumnCardDropArea
              id={col.columnId + "-" + (index + 1).toString()}
              colId={col.columnId}
              idx={index + 1}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ColumnArea;
