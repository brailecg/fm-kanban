import React from "react";
import ColumnItem from "./ColumnItem";
import ColumnName from "./ColumnName";
import ColumnCardDropArea from "./ColumnCardDropArea";
const ColumnArea = ({ column }) => {
  return (
    <div className="flex flex-col ">
      <ColumnName
        name={column.columnName}
        color={column.columnColor}
        count={column.cards.length}
      />
      <ColumnCardDropArea
        id={column.columnId + "-0"}
        colId={column.columnId}
        idx={0}
      />
      {column.cards.map((item, index) => {
        return (
          <React.Fragment key={item.cardId}>
            <ColumnItem item={item} colId={column.columnId} />
            <ColumnCardDropArea
              id={column.columnId + "-" + (index + 1).toString()}
              colId={column.columnId}
              idx={index + 1}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ColumnArea;