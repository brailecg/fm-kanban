import React from "react";
import ColumnItem from "./ColumnItem";
import ColumnName from "./ColumnName";
const ColumnArea = ({ column }) => {
  return (
    <div key={column.columnId} className="flex flex-col">
      <ColumnName
        name={column.columnName}
        color={column.columnColor}
        count={column.cards.length}
      />

      {column.cards.map((item) => {
        return (
          <React.Fragment key={item.cardId}>
            <ColumnItem item={item} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ColumnArea;
