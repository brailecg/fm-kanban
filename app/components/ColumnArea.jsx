import React from "react";
import ColumnItem from "./ColumnItem";

import ColumnCardDropArea from "./ColumnCardDropArea";
const ColumnArea = ({ column, columns }) => {
  return (
    <div className="flex flex-col ">
      <ColumnCardDropArea id={column.id + "-0"} colId={column.id} idx={0} />
      {column.cards.map((item, index) => {
        return (
          <React.Fragment key={item.id}>
            <ColumnItem item={item} colId={column.id} columns={columns} />
            <ColumnCardDropArea
              id={column.id + "-" + (index + 1).toString()}
              colId={column.id}
              idx={index + 1}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ColumnArea;
